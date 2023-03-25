const puppeteer = require('puppeteer');
const fs = require('fs');

async function extractData(){

    
    const browser = await puppeteer.launch({headless : true});
    const page = await browser.newPage();
   
  
   
    await page.goto('https://github.com/trending');
   


    //Evaluate
    var all_repos = await page.evaluate(() => {
        var repos = [];
        


        //Repository-Title  
            var repoTitle = Array.from(document.querySelectorAll('div > article.Box-row > h1'));

            var title_list = [];
            repoTitle.forEach((title) => {
                var rep_titl = title.querySelector('a').textContent.trim();
                title_list.push(rep_titl);
            });
        
        //

        //Description
        var repoDescription = Array.from(document.querySelectorAll('div > article.Box-row > p'));

        var desc_ = [];
        repoDescription.forEach((desc) => {
            var rep_desc = desc.textContent.trim();
            desc_.push(rep_desc);
        });
        //

        //URL
        var repoUrl = Array.from(document.querySelectorAll('div > article.Box-row > h1'));

        var url_list = [];
        repoUrl.forEach((url) => {
            var rep_url = url.querySelector('a').innerText;
            url_list.push(rep_url);
        });

        //Stars
        var repoStar = Array.from(document.querySelectorAll('div > article.Box-row > div > a:nth-of-type(1)'));

        var star_list = [];
        repoStar.forEach((star) => {
            var repo_star = star.innerText;
            star_list.push(repo_star);
        });
        //Forks
        var repoForks = Array.from(document.querySelectorAll('div > article.Box-row > div > a:nth-of-type(2)'));

        var forks_list = [];
        repoForks.forEach((forks) => {
            var repo_forks = forks.innerText;
            forks_list.push(repo_forks);
        });

        //Language
        var repo_lang_list = Array.from(document.querySelectorAll('div > article.Box-row > div > span > span:nth-child(2)'));

        var lang_list = [];
        repo_lang_list.forEach((lang) => {
            var repo_language = lang.innerText;
            lang_list.push(repo_language);    
        });
        //


        //
        var n = repoTitle.length;
        for(var i=0; i<n; i++){
            var repo_obj = {
                Title:title_list[i],
                Description:desc_[i],
                URL:url_list[i],
                Stars:star_list[i],
                Forks:forks_list[i],
                Language:lang_list[i]
            }
            repos.push(repo_obj);
        }
        //

        return repos;


    });

    // console.log("Repositeries: ",all_repos);

    var done = (error) => {
        if(error){
            console.error(error);
            return;
        }
    }
    var JSON_Data = JSON.stringify(all_repos,null,2);

    fs.writeFile('Data.json',JSON_Data,done)
    console.log(JSON_Data);

  

    
    await browser.close();
}

extractData();



    