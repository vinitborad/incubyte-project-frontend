import React from 'react'

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-orange-600 to-pink-600 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Sweet Delights</h3>
            <p className="text-orange-100">Your trusted destination for authentic and delicious sweets since 1995.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Info</h3>
            <p className="text-orange-100 mb-2">📍 123 Sweet Street, Dessert City</p>
            <p className="text-orange-100 mb-2">📞 +91 98765 43210</p>
            <p className="text-orange-100">✉️ info@sweetdelights.com</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Opening Hours</h3>
            <p className="text-orange-100 mb-2">Mon - Sat: 9:00 AM - 9:00 PM</p>
            <p className="text-orange-100">Sunday: 10:00 AM - 8:00 PM</p>
          </div>
        </div>
        <div className="border-t border-orange-400 mt-8 pt-8 text-center">
          <p className="text-orange-100">© 2024 Sweet Delights. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer