const puppeteer = require('puppeteer');

try{
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const dayNow = new Date(Date.now()).getDay();

  const standartDelay = 500;
  
  const confirmAction = async () => {
    await page.evaluate(()=>{
      const domNode = document.querySelectorAll('a');
      const node = Array.from(domNode)
      .find(el => el.innerText === 'Да, подтверждаю');
      if (node) {
          node.click();
      }
    });

    await page.waitFor(standartDelay);
  };

  // Props => {tag, action, delay}
  const searchAndClick = async (obj) => {
    await page.evaluate((obj)=>{
      const node = Array.from(document.querySelectorAll(obj.tag))
        .find(el => el.textContent === obj.action);
      if (node) {
          node.click();
      }
    },obj); 
    await page.waitFor(obj.delay);
  }

  // Props => {tag, index, delay, mondayAndThursday?}
  const clickInElementWithTopBlock = async (obj) => {
    await page.evaluate(({tag, index, mondayAndThursday = false})=>{
      const dayNow = new Date(Date.now()).getDay();
      const topBlock = document.querySelector('.feedback');
      const domNode = document.querySelectorAll(tag);
      const clickFunc = () => {
        if(topBlock){
          domNode[index + 1].click();
        } else {
          domNode[index].click();
        }
      }

      if(mondayAndThursday){
        if(dayNow === 1 || dayNow === 4){
          clickFunc();
        }
      } else {
        clickFunc();
      }

    }, obj); 

    await page.waitFor(obj.delay);
  }

  const customGoTo = async (path, delay) => {
    await page.goto(path);
    await page.waitFor(delay);
  }


  //   Script Start 


  // Авторизація по силці
  await customGoTo('http://sadovnik.mobi/autologin/3094169/Dn5LEc7IZSHPm6zhL8Gb108PQg4saywM', standartDelay);

  // Перейти до обміннику і обміняти рубіни
  await customGoTo('http://sadovnik.mobi/converter', standartDelay);
  await clickInElementWithTopBlock({tag: 'a', index: 3, delay: standartDelay, mondayAndThursday: false});
  
  // Викликати усі гвинтокрили
  await customGoTo('http://sadovnik.mobi/mypetfarm', standartDelay);
  await searchAndClick({tag: 'a', action: 'Вызвать все вертолеты', delay: standartDelay});

  // Оренда пугала, якщо понеділок або четвер
  await customGoTo('http://sadovnik.mobi/shop/scarecrow', standartDelay);
  await clickInElementWithTopBlock({tag: 'a', index: 3, delay: standartDelay, mondayAndThursday: false});
  await confirmAction();

  // Оренда вітряка, якщо понеділок або четвер
  await customGoTo('http://sadovnik.mobi/shop/vetriak', standartDelay);
  await clickInElementWithTopBlock({tag: 'a', index: 3, delay: standartDelay, mondayAndThursday: true});

  // Покликати гостів на обід, якщо понеділок або четвер
  await customGoTo('http://sadovnik.mobi/applyBuff?0=2', standartDelay);
  if(dayNow === 1 || dayNow === 4){
    await page.goto('http://sadovnik.mobi/applyBuff?0=2');
    await confirmAction();
  }

  // Перейти на грядки
  await customGoTo('http://sadovnik.mobi/myfarm',standartDelay);
  await searchAndClick({tag: 'a', action: 'Полить всё', delay: standartDelay});
  await searchAndClick({tag: 'a', action: 'Удобрить всё', delay: standartDelay});
  await searchAndClick({tag: 'a', action: 'Собрать всё', delay: standartDelay});
  await searchAndClick({tag: 'a', action: 'Вскопать всё', delay: standartDelay});
  await searchAndClick({tag: 'a', action: 'Засеять всё', delay: standartDelay});


  // Годувати тварин і забрати з них дохід
  await customGoTo('http://sadovnik.mobi/mypetfarm?-1.ILinkListener-foodAllLink', standartDelay);
  if(dayNow === 1 || dayNow === 4){
    await confirmAction();
    await customGoTo('http://sadovnik.mobi/mypetfarm?-1.ILinkListener-harvestAllLink', standartDelay);
  }

  // Перейти до погребу, продати все, заготовити все. ЯКЩО ЗМІНИТЬСЯ КІЛЬКІСТЬ ПОЛИЦЬ, замінити 18
  await customGoTo('http://sadovnik.mobi/mycellar', standartDelay);
  await searchAndClick({tag: 'a', action: 'Продать всё', delay: standartDelay});
  await searchAndClick({tag: 'a', action: 'Заготовить всё', delay: standartDelay});
  await searchAndClick({tag: 'a', action: 'Докупить состав на 18 порций', delay: standartDelay});
  await searchAndClick({tag: 'a', action: 'Поставить', delay: standartDelay});

  // Перейти до прудів, забрати рибу і розводити
  await customGoTo('http://sadovnik.mobi/mypool?-1.ILinkListener-harvestAll&t=0', standartDelay);
  await searchAndClick({tag: 'a', action: 'Разводить', delay: standartDelay});
  await searchAndClick({tag: 'a', action: 'Покормить всё', delay: standartDelay});
  await confirmAction();

  // Перейти до салуну
  await customGoTo('http://sadovnik.mobi/rancho', standartDelay);
  await searchAndClick({tag: 'a', action: 'Нанять Джека', delay: standartDelay});
  await confirmAction();
  await customGoTo('http://sadovnik.mobi/saloon?-1.ILinkListener-getRubiesRewardLink', standartDelay);
  
  // Забрати бонусні ресурси (Доски)
  await page.goto('http://sadovnik.mobi/shop/buildingMaterials?-1.ILinkListener-watchAddGetBoard');
    await page.goto('http://mdog.mobi/p/sad');
    await page.goto('http://marsgame.mobi/');
    await page.goto('http://mdolls.mobi/p/sad');
  await page.goto('http://sadovnik.mobi/shop/buildingMaterials?-1.ILinkListener-watchAddGetBoard');
    await page.goto('http://mdog.mobi/p/sad');
    await page.goto('http://marsgame.mobi/');
    await page.goto('http://mdolls.mobi/p/sad');
  await page.goto('http://sadovnik.mobi/shop/buildingMaterials?-1.ILinkListener-watchAddGetBoard');
    await page.goto('http://mdog.mobi/p/sad');
    await page.goto('http://marsgame.mobi/');
    await page.goto('http://mdolls.mobi/p/sad');

  // Забрати нагороду у профілі(Ключі або Сундуки)
  await page.goto('http://sadovnik.mobi/tasks?-1.ILinkListener-task-0-rewardLink&0=3094169');
  await page.goto('http://sadovnik.mobi/tasks?-1.ILinkListener-task-1-rewardLink&0=3094169');
  await page.goto('http://sadovnik.mobi/tasks?-1.ILinkListener-task-2-rewardLink&0=3094169');
  await page.goto('http://sadovnik.mobi/tasks?-1.ILinkListener-task-3-rewardLink&0=3094169');
  await page.goto('http://sadovnik.mobi/tasks?-1.ILinkListener-task-4-rewardLink&0=3094169');
  await page.goto('http://sadovnik.mobi/tasks?-1.ILinkListener-task-5-rewardLink&0=3094169');
  await page.goto('http://sadovnik.mobi/tasks?-1.ILinkListener-task-6-rewardLink&0=3094169');
  await page.goto('http://sadovnik.mobi/tasks?-1.ILinkListener-task-7-rewardLink&0=3094169');
  await page.goto('http://sadovnik.mobi/tasks?-1.ILinkListener-task-8-rewardLink&0=3094169');
  
  // await page.screenshot({path: 'result.png', fullPage: true});
  // console.log('Screenshot are created');
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth()+1;
  const day = date.getDate();
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const dateString = `${day}.${month}.${year} - ${hour}:${minutes}:${seconds}`;
  
  console.log(dateString);
  

  await browser.close();
})();
}
catch(e){
  console.error('Error',dateString);
  process.exit(1);
}