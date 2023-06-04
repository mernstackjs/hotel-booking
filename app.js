
  
  

// Function to book a hotel
function bookHotel(hotelName, checkInDate, checkOutDate, numberOfGuests, isMember, roomType, amenities) {
    function generateConfirmationNumber() {
      return Math.floor(Math.random() * 1000000);
    }
  
    function calculateTotalPrice() {
      const days = calculateNumberOfDays();
      let basePrice = days * getRoomPrice(); // Total price based on number of days and room price
  
      if (isMember) {
        // Apply membership discount
        basePrice *= 0.9; // 10% discount for members
      }
  
      // Calculate additional charges or discounts based on the hotel's policies
      // ...
  
      return basePrice;
    }
  
    function calculateNumberOfDays() {
      const millisecondsPerDay = 24 * 60 * 60 * 1000;
      const checkInDateMs = checkInDate.getTime();
      const checkOutDateMs = checkOutDate.getTime();
      const days = Math.round(Math.abs((checkOutDateMs - checkInDateMs) / millisecondsPerDay));
      return days;
    }
  
    function getRoomPrice() {
      // Retrieve room price based on room type from a database or API
      // ...
  
      // For this example, we assume a fixed room price per night based on room type
      switch (roomType) {
        case 'standard':
          return 100;
        case 'deluxe':
          return 150;
        case 'suite':
          return 200;
        default:
          return 100;
      }
    }
  
    function formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString('en-US', options);
    }
  
    const confirmationNumber = generateConfirmationNumber();
    const totalPrice = calculateTotalPrice();
    const formattedCheckInDate = formatDate(checkInDate);
    const formattedCheckOutDate = formatDate(checkOutDate);
  
    return {
      confirmationNumber: confirmationNumber,
      hotelName: hotelName,
      checkInDate: formattedCheckInDate,
      checkOutDate: formattedCheckOutDate,
      numberOfGuests: numberOfGuests,
      isMember: isMember,
      roomType: roomType,
      amenities: amenities,
      totalPrice: totalPrice.toFixed(2),
    };
  }

  document.getElementById('bookingForm').addEventListener('submit', function(e) {
    e.preventDefault();
  
    // Retrieve form values
    const hotelName = document.getElementById('hotelName').value;
    const checkInDate = new Date(document.getElementById('checkInDate').value);
    const checkOutDate = new Date(document.getElementById('checkOutDate').value);
    const numberOfGuests = parseInt(document.getElementById('numberOfGuests').value);
    const isMember = document.getElementById('isMember').checked;
    const roomType = document.getElementById('roomType').value;
    const amenities = document.getElementById('amenities').value.split(',');
  
    // Call the bookHotel function with form values
    const bookingDetails = bookHotel(hotelName, checkInDate, checkOutDate, numberOfGuests, isMember, roomType, amenities);
  
    // Display the booking details
    console.log(bookingDetails);
  
    // Generate and download PDF
    generatePDF(bookingDetails);
  });
  
  function generatePDF(bookingDetails) {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Booking Details', 10, 10);
    doc.setFontSize(12);
    doc.text(`Confirmation Number: ${bookingDetails.confirmationNumber}`, 10, 20);
    doc.text(`Hotel Name: ${bookingDetails.hotelName}`, 10, 30);
    doc.text(`Check-in Date: ${bookingDetails.checkInDate}`, 10, 40);
    doc.text(`Check-out Date: ${bookingDetails.checkOutDate}`, 10, 50);
    doc.text(`Number of Guests: ${bookingDetails.numberOfGuests}`, 10, 60);
    doc.text(`Member: ${bookingDetails.isMember ? 'Yes' : 'No'}`, 10, 70);
    doc.text(`Room Type: ${bookingDetails.roomType}`, 10, 80);
    doc.text(`Amenities: ${bookingDetails.amenities.join(', ')}`, 10, 90);
    doc.text(`Total Price: $${bookingDetails.totalPrice}`, 10, 100);
  
    // Save the PDF and provide a download link
    doc.save('booking_details.pdf');
  }
