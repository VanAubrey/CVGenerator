window.onload = function() {
  
};

function generatePDF2() {
  // Get the <div> element
  const divElement = document.getElementById('capture');

  // Set the dimensions for A4 size
  const pdfWidth = 595.28;
  const pdfHeight = 841.89;

  // Calculate the scale factor based on the div dimensions and A4 size
  const width = divElement.offsetWidth;
  const height = divElement.offsetHeight;
  const scaleWidth = pdfWidth / width;
  const scaleHeight = pdfHeight / height;
  const scaleFactor = Math.min(scaleWidth, scaleHeight);

  // Increase the scale factor for capturing higher resolution content
  const scaleForHighResolution = 4; // You can adjust this value to your preference

  html2canvas(divElement, { scale: scaleFactor * scaleForHighResolution })
    .then(function (canvas) {
      // Convert the canvas to an image data URL
      const imgData = canvas.toDataURL('image/png');

      // Calculate the aspect ratio of the captured image
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const aspectRatio = imgWidth / imgHeight;

      // Calculate the height based on the A4 width and aspect ratio
      const pdfImgWidth = pdfWidth;
      const pdfImgHeight = pdfImgWidth / aspectRatio;

      // Create a new jsPDF instance with A4 size
      const pdf = new jsPDF('p', 'pt', 'a4');

      // Function to add a page break
      function addPageBreak(pageNumber) {
        if (pageNumber > 1) {
          pdf.addPage();
        }
      }

      let pageNumber = 1;
      let yPosition = 40;

      // Loop through the div content and add images to respective pages
      while (yPosition < height) {
        addPageBreak(pageNumber);

        // Add the image to the PDF with A4 dimensions
        pdf.addImage(
          imgData,
          'PNG',
          0,
          -40 + yPosition,
          pdfImgWidth,
          pdfImgHeight
        );

        yPosition += pdfHeight;
        pageNumber++;
      }

      // Save the PDF
      pdf.save('generated.pdf');
    });
}

