const cheerio = require("cheerio");
const axios = require("axios");
const fs = require("fs");

const titles = require('./data.js').titles;

let blockedTitles = ["Crafting", "Houses"];

axios.get("https://terraria.wiki.gg/wiki/Terraria_Wiki").then(function (response) {
    const $ = cheerio.load(response.data);

    fs.unlink('data.js', err => {});
    fs.writeFileSync("data.js", "let titles = [", {flag: "a+"}, err => {});
    $('.i').each(function () {
        let newTitle =  $(this).text();
        let newData = `"${newTitle}",\r\n`;
        
        if (!blockedTitles.includes(newTitle)) {
            fs.writeFileSync("data.js", newData, {flag: "a+"}, err => {});
            
        }
    });
    fs.writeFileSync("data.js", "]; module.exports.titles = titles;", {flag: "a+"}, err => {});

}).catch(function (error) {
    console.log(error);
}).then(function () {
    console.log(titles);
});