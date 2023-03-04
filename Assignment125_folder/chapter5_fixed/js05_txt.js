"use strict";
/*    JavaScript 7th Edition
      Chapter 5
      Chapter Case

      Application to generate a slide show
      Author: 
      Date:   

      Filename: js05.js
*/

window.addEventListener("load", setupGallery);

function setupGallery() {
   let imageCount = imgFiles.length;
   let galleryBox = document.getElementById("lightbox");
   let currentSlide = 1;
   let runShow = true;
   let showRunning;
   
   let galleryTitle = document.createElement("h1");
   galleryTitle.id = "galleryTitle";
   let slidesTitle = lightboxTitle; // TODO figure out title
   galleryTitle.textContent = slidesTitle;
   galleryBox.appendChild(galleryTitle);
   
   let slideCounter = document.createElement("div");
   slideCounter.id = "slideCounter";
   slideCounter.textContent = currentSlide + "/" + imageCount;
   galleryBox.appendChild(slideCounter);
   
   let leftBox = document.createElement("div");
   leftBox.id = "leftBox";
   leftBox.innerHTML = "&#9664;";
   leftBox.onclick = moveToLeft;   
   galleryBox.appendChild(leftBox);
   
   let rightBox = document.createElement("div");
   rightBox.id = "rightBox";
   rightBox.innerHTML = "&#9654;";  
   rightBox.onclick = moveToRight;   
   galleryBox.appendChild(rightBox);
   
   let playPause = document.createElement("div");
   playPause.id = "playPause";
   playPause.innerHTML = "&#9199;";
   playPause.onclick = startStopShow;
   galleryBox.appendChild(playPause);
   
   let slideBox = document.createElement("div");
   slideBox.id = "slideBox";
   galleryBox.appendChild(slideBox);
   
   
   for (let i = 0; i < imageCount; i++) {
      let image = document.createElement("img");
      image.src = imgFiles[i];
      image.alt = imgCaptions[i];
      image.onclick = createModal;
      slideBox.appendChild(image);
   }
  
   let myfavourite = document.createElement('div');
   myfavourite.className = 'MyFavouriteImages';
   let favouritecaption = document.createElement('h1');
   favouritecaption.innerHTML = 'MyFavouriteImages';
   myfavourite.appendChild(favouritecaption);
   galleryBox.appendChild(myfavourite);
   favouritecaption.classList = 'nature'

   
   function moveToRight() {
      let firstImage = slideBox.firstElementChild.cloneNode("true");
      firstImage.onclick = createModal;
      slideBox.appendChild(firstImage);
      slideBox.removeChild(slideBox.firstElementChild);
      currentSlide++;
      if (currentSlide > imageCount) {
         currentSlide = 1;
      }
      slideCounter.textContent = currentSlide + " / " + imageCount;
   }
   
   function moveToLeft() {
      let lastImage = slideBox.lastElementChild.cloneNode("true");
      lastImage.onclick = createModal;
      slideBox.removeChild(slideBox.lastElementChild);
      slideBox.insertBefore(lastImage, slideBox.firstElementChild);
      currentSlide--;
      if (currentSlide === 0) {
         currentSlide = imageCount;
      }
      slideCounter.textContent = currentSlide + " / " + imageCount;      
   }  
   
   function startStopShow() {
      if (runShow) {
         showRunning = window.setInterval(moveToRight, 2000);
         runShow = false;
      } else {
         window.clearInterval(showRunning);
         runShow = true;
      }
   }
   
   function createModal() {
      let modalWindow = document.createElement("div");
      modalWindow.id = "lbOverlay";
      let figureBox = document.createElement("figure");
      modalWindow.appendChild(figureBox);
      
      let modalImage = this.cloneNode("true");
      figureBox.appendChild(modalImage);
      
      let figureCaption = document.createElement("figcaption");
      figureCaption.textContent = modalImage.alt;
      figureBox.appendChild(figureCaption);




      let Buttondiv = document.createElement('div');

      let favouritebutton = document.createElement('button');
      
      favouritebutton.className = 'favouritebutton';
      
      favouritebutton.innerHTML = 'Add Images to Favourite';
      
      Buttondiv.appendChild(favouritebutton);
      figureBox.appendChild(Buttondiv);
      
      favouritebutton.onclick = function(){
      
      
         if(favouritelist.length  != 5){
          var source = modalImage.src;
          if (favouritelist.includes (source)){
            alert('This image is already added to favourite');
          }else{
            favouritelist.push(source);
      
            let newdiv = document.createElement('div');
            let image = document.createElement('img');
            image.className = 'favImages';
            image.src = modalImage.src;
      
            var isclicked = false;
            newdiv.appendChild(image);
            myfavourite.appendChild(newdiv);
      
            image.onclick = function(){
               if (isclicked === false){
                  let removeButton = document.createElement('button');
                  removeButton.innerHTML = 'Remove Button';
      
                  newdiv.appendChild(removeButton);
                  removeButton.onclick = function (){
                     favouritelist.pop(image.src);
                     myfavourite.removeChild(newdiv); 
                  }
                  isclicked = true;
               }else{
      
               }
            }
      
          }
          
         }else{
            alert('You can only add 5 images remove atleast 1 to add another');
         }
      }
      
      



      
      let closeBox = document.createElement("div");
      closeBox.id = "lbOverlayClose";
      closeBox.innerHTML = "&times;";
      closeBox.onclick = function() {
         document.body.removeChild(modalWindow);
      }
      
      modalWindow.appendChild(closeBox);
      
      document.body.appendChild(modalWindow);
   }
   
}