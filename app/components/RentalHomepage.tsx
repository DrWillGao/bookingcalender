'use client';

import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';

// Navigation component for better organization
const Navigation = () => (
  <nav className="absolute top-0 w-full p-6 flex justify-between items-center text-white">
    <div className="text-2xl font-serif">Your Property Name</div>
    <div className="space-x-6">
      <button className="hover:text-gray-200">Our Apartments</button>
      <button className="hover:text-gray-200">Location</button>
      <button className="hover:text-gray-200">Gallery</button>
      <button className="hover:text-gray-200">Contact</button>
      <button className="px-4 py-2 border rounded-md hover:bg-white hover:text-black transition">
        Book Now
      </button>
    </div>
  </nav>
);

// BookingWidget component for the date selection form
interface BookingWidgetProps {
  checkIn: string;
  checkOut: string;
  onCheckInChange: (date: string) => void;
  onCheckOutChange: (date: string) => void;
}

const BookingWidget: React.FC<BookingWidgetProps> = ({
  checkIn,
  checkOut,
  onCheckInChange,
  onCheckOutChange,
}) => {
  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];
  
  // Calculate minimum checkout date based on check-in
  const minCheckoutDate = checkIn || today;

  const handleCheckInChange = (date: string) => {
    onCheckInChange(date);
    // If checkout is before new check-in, update checkout
    if (checkOut && date > checkOut) {
      onCheckOutChange(date);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg text-black">
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-sm mb-2">Check-in</label>
          <div className="relative">
            <input
              type="date"
              className="w-full p-2 border rounded"
              value={checkIn}
              min={today}
              onChange={(e) => handleCheckInChange(e.target.value)}
            />
            <Calendar className="absolute right-2 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>
          {checkIn && (
            <p className="text-sm text-gray-600 mt-1">
              Selected: {new Date(checkIn).toLocaleDateString()}
            </p>
          )}
        </div>
        <div className="flex-1">
          <label className="block text-sm mb-2">Check-out</label>
          <div className="relative">
            <input
              type="date"
              className="w-full p-2 border rounded"
              value={checkOut}
              min={minCheckoutDate}
              onChange={(e) => onCheckOutChange(e.target.value)}
              disabled={!checkIn} // Disable until check-in is selected
            />
            <Calendar className="absolute right-2 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>
          {checkOut && (
            <p className="text-sm text-gray-600 mt-1">
              Selected: {new Date(checkOut).toLocaleDateString()}
            </p>
          )}
        </div>
        <button 
          className={`self-end px-6 py-2 bg-green-700 text-white rounded hover:bg-green-800 transition ${
            (!checkIn || !checkOut) ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={!checkIn || !checkOut}
        >
          Book Now
        </button>
      </div>
      {checkIn && checkOut && (
        <div className="mt-4 text-sm text-gray-600">
          Duration: {Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24))} nights
        </div>
      )}
    </div>
  );
};

// HeroContent component for the main content section
interface HeroContentProps {
  checkIn: string;
  checkOut: string;
  onCheckInChange: (date: string) => void;
  onCheckOutChange: (date: string) => void;
}

const HeroContent: React.FC<HeroContentProps> = ({
  checkIn,
  checkOut,
  onCheckInChange,
  onCheckOutChange,
}) => (
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white">
    <h1 className="text-6xl font-serif mb-4">Your Property Name</h1>
    <p className="text-xl mb-8">Luxury Serviced Apartments</p>
    <BookingWidget
      checkIn={checkIn}
      checkOut={checkOut}
      onCheckInChange={onCheckInChange}
      onCheckOutChange={onCheckOutChange}
    />
  </div>
);

// Main RentalHomepage component
const RentalHomepage: React.FC = () => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  
  // Optional: Log date changes for API integration preparation
  useEffect(() => {
    if (checkIn && checkOut) {
      console.log('Dates selected:', {
        checkIn: new Date(checkIn).toISOString(),
        checkOut: new Date(checkOut).toISOString(),
        nights: Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24))
      });
    }
  }, [checkIn, checkOut]);

  return (
    <div className="min-h-screen">
      <div className="relative h-screen">
        <div className="absolute inset-0 bg-black/30">
          <img 
            src="/api/placeholder/1920/1080" 
            alt="Property exterior" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <Navigation />
        <HeroContent
          checkIn={checkIn}
          checkOut={checkOut}
          onCheckInChange={setCheckIn}
          onCheckOutChange={setCheckOut}
        />
      </div>
    </div>
  );
};

export default RentalHomepage; 