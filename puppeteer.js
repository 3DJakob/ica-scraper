const uuid = require('uuid/v4');
const puppeteer = require('puppeteer');

(async () => {
  try {
    // const browser = await puppeteer.launch();
    const browser = await puppeteer.launch({headless: false, args: [ '--single-process' ]});
    console.log(await browser.version())
    const page = await browser.newPage()
    // page.setUserAgent("Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1");
    console.log('page opened, going to url')
    await page.goto('https://www.ica.se/recept/middag/')
    // await page.waitForNavigation()

    const getRecipe = async (url) => {
      await page.goto(url)
      // setTimeout(()=> {}, 20000)
    }

    await page.waitForSelector('.loadmore-button', { timeout: 20000 })
    await page.click('.loadmore-button')

    await page.waitFor((prevLength) => {
          let elements = Array.from(document.querySelectorAll('header>h2>a'))
          return elements.length > 17
    }, 17)


    const links = await page.evaluate(() => {
        let elements = Array.from(document.querySelectorAll('header>h2>a'))
        let links = elements.map(element => { return element.href })
        return links;
    },)

    console.log(links)
    // console.log(uuid())
    await getRecipe(links[0])


    // await browser.close()
  } catch (error) {
    console.log(error)
  }
})();
