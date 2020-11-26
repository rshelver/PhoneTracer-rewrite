const puppeteer = require('puppeteer')
const readline = require('readline')


var rl = readline.createInterface({
input: process.stdin,
output: process.stdout
});


phone_number = "";

console.log("PhoneTracer-Rewrite 1.0.2");
console.log("Developed by Mutiny27");
// console.log("Please Enter the number you wish to trace: Hidden for privacy reason");
rl.question("Please Enter the number you wish to trace: ", function(answer) {
  phone_number = answer;
  console.log("Please wait, this may take a minute...");
  console.log("If this takes more than a minute please restart the program");
  rl.close();
});

const main = async () => {
  const browser = await puppeteer.launch({headless: true})
  const page = await browser.newPage()
  await page.setViewport({ width: 1366, height: 768});
  await page.goto('https://www.spydialer.com/', {waitUntil: 'networkidle2'})

  await page.type('#SearchInputTextBox', phone_number)


  await page.keyboard.press('Enter');


  await page.waitForSelector('[name="ctl00$ContentPlaceHolder1$SearchCellImageButton"]')

  setTimeout(() => {page.click('[name="ctl00$ContentPlaceHolder1$SearchCellImageButton"]'); }, 7000);

  await page.waitForSelector('#ctl00_ContentPlaceHolder1_NameLinkButton');


  const elementId = 'ctl00_ContentPlaceHolder1_NameLinkButton';

  const text = await page.evaluate(elementId => document.getElementById(elementId).textContent, elementId);


  console.log("name:", text);


}
main()
