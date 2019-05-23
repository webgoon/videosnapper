// Global vars
let width = 500,
    height = 0,
    filter = 'none'
    streaming = false;

    // DOM Elements
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const photos = document.getElementById('photos');
    const photoButton = document.getElementById('photo-button');
    const clearButton = document.getElementById('clear-button');
    const photoFilter = document.getElementById('photo-filter');
    

    // Get media stream
    navigator.mediaDevices.getUserMedia({video: true, audio: true}
      )
      .then(function(stream){
        // Link to the video source
        video.srcObject = stream;
        // Play video
        video.play();

      })
      .catch(function(err){
        console.log(`Error: ${err}`);
      });


      // Play when ready
      video.addEventListener('canplay', function(e){
          if(!streaming){

            // Set video / canvas height dynamically
            height = video.videoHeight / (video.videoWidth / width);


            video.setAttribute('width', width);
            video.setAttribute('height', height);
            canvas.setAttribute('width', width);
            canvas.setAttribute('height', height);

            streaming = true;

          }
      }, false);

      // Listening for the takepicture button
      // Photo button event
      photoButton.addEventListener('click', function(e){
        takePicture();
        e.preventDefault();


      }, false);

      // Filter event
      photoFilter.addEventListener('change', function(e){
        // Set Filter to chosen option
        filter = e.target.value;
        video.style.filter = filter;
        e.preventDefault();
      });

      // Clear event - Clear photo
     clearButton.addEventListener('click', function(e){
       photos.innerHTML = '';
       // Change filter back to normal
       filter = 'none';
       // Set video filter
       video.style.filter = filter;
       // Reset Select list back to first element
       photoFilter.selectedIndex = 0;

     });

      // Setting the logic on the take picture button
      // Take picture from canvas
      function takePicture(){
        console.log('Taking Pic!');
        // Create Canvas
        const context = canvas.getContext('2d');
        if(width && height){
          // Set cavnas props
          canvas.width = width;
          canvas.height = height;
          // Draw an image of the video on the canvas
          context.drawImage(video, 0, 0, width, height);

          // Create image from the canvas
          const imgURL = canvas.toDataURL('image/png');
          //console.log(imgURL); // Gives you the base/64 blob stringS
          // Create img element
          const img = document.createElement('img');
          //Set img src
          img.setAttribute('src', imgURL);
          // Add image to photos
          photos.appendChild(img);

          // Set image filter
          img.style.filter = filter;

          // Add image to photos
          photos.appendChild(img);



        }
      }