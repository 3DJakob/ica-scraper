const fs = require('fs')
const uuid = require('uuid/v5')
const puppeteer = require('puppeteer')

const parseIcaItem = require('./lib/item-parser')

async function main (numberOfReceipes) {
  // const browser = await puppeteer.launch({headless: false, args: [ '--single-process' ]});
  const browser = await puppeteer.launch()

  try {
    console.log(await browser.version())
    const page = await browser.newPage()
    // page.setUserAgent("Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1");
    await page.setRequestInterception(true)
    page.on('request', (request) => {
      if (['image', 'stylesheet', 'font'].includes(request.resourceType())) {
        request.abort();
      } else {
        request.continue();
      }
    })
    console.log('page opened, going to url')
    await page.goto('https://www.ica.se/recept/middag/')
    // await page.waitForNavigation()

    const getTextContentFromSelector = async (selector, waitForSelector = selector) => {
      await page.waitForSelector(waitForSelector)
      const text = await page.evaluate((selector) => {
        return document.querySelector(selector) ? document.querySelector(selector).textContent : null
      }, selector)
      return text
    }

    const getRecipeTitle = async () => {
      return await getTextContentFromSelector('.recipepage__headline')
    }

    const getRecipeIngrients = async () => {
      await page.waitForSelector('.ingredients__list')

      let ingredients = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('.ingredients__list>li'), i => i.textContent)
      })

      // console.log(JSON.stringify(Array.from(document.querySelectorAll('.ingredients__list>li'), i => i.textContent.replace('\n                        ', '').replace('\n                    ', ''))))

      return ingredients.reduce((mem, line) => {
        line = line.replace('\n                        ', '')
        line = line.replace('\n                    ', '')

        return [...mem, ...parseIcaItem(line)]
      }, [])
    }

    const getRecipeSteps = async () => {
      await page.waitForSelector('.howto-steps')
      let ingredients = await page.evaluate(() => {
        const items = Array.from(document.querySelectorAll('.howto-steps>.cooking-step>.cooking-step__content>.cooking-step__content__instruction'), i => i.textContent.trim())
        return items
      })
      return ingredients
    }

    const getRecipeNutritional = async () => {
      const text = await getTextContentFromSelector('.nutrients__summary__text__data', '.recipepage__headline')
      if (text == null) return null
      const m = /(\d+) kCal/.exec(text)
      return Number.parseInt(m[1])
    }

    const getRecipeNumberOfPortions = async () => {
      // await page.waitForSelector('#currentPortions')
      const number = await page.evaluate(() => {
        if (document.querySelector('#currentPortions')) {
          return document.querySelector('#currentPortions').value
        } else {
          return null
        }
      },)
      return Number.parseInt(number)
    }

    const getRecipeImageURL = async () => {
      await page.waitForSelector('.recipe-image-square__image')
      const image = await page.evaluate(() => {
        const element = document.querySelector('.recipe-image-square__image')
        return element.style.backgroundImage
      })
      return image
    }

    const getRecipe = async (url) => {
      const recipe = {
        title: '',
        id: '',
        ingredients: [],
        steps: [],
        nutritional: 0,
        numberOfPortions: 0,
        url: url,
        imageURL: ''
      }

      await page.goto(url)
      recipe.title = await getRecipeTitle()
      recipe.id = uuid(recipe.title, 'b893c16d-017a-4fe7-a9a8-7789d505a1ae')
      console.log('Getting recepie ' + recipe.title)
      recipe.ingredients = await getRecipeIngrients()
      recipe.steps = await getRecipeSteps()
      recipe.nutritional = await getRecipeNutritional()
      recipe.numberOfPortions = await getRecipeNumberOfPortions()
      recipe.imageURL = await getRecipeImageURL()

      return recipe
    }

    await page.waitForSelector('.loadmore-button', { timeout: 20000 })

    let length = await page.evaluate(() => document.querySelectorAll('header>h2>a').length)
    while (length < numberOfReceipes) {
      await page.click('.loadmore-button')
      await page.waitFor((prevLength) => document.querySelectorAll('header>h2>a').length > prevLength, {}, length)
      length = await page.evaluate(() => document.querySelectorAll('header>h2>a').length)
    }

    let links = await page.evaluate(() => {
      let elements = Array.from(document.querySelectorAll('header>h2>a'))
      let links = elements.map(element => { return element.href })
      return links
    })
    links = links.slice(0, numberOfReceipes)

    const recipes = []
    for (const link of links) {
      const recepie = await getRecipe(link)
      if (recepie.numberOfPortions) {
        recipes.push(recepie)
      } else {
        console.log('Recepie with undefined portions!')
      }
    }
    console.log('recepies fetched and constructed')
    return recipes
  } finally {
    await browser.close()
  }
}

main(20).then((result) => {
  console.log('writing to file')
  fs.writeFileSync('result.json', JSON.stringify(result, null, 2) + '\n')
}).catch((err) => {
  process.exitCode = 1
  console.error(err.stack)
})
