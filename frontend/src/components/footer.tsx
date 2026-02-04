
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram  } from "react-icons/fa";

const Footer =() => {
  return (
    <footer className='bg-gray-800 px-4 md:px-16 lg:px-28 py-8'>
      <div className ='grid grid-cols-1 md:grid-cols-3'>
        <div>
          <h2 className='text-lg font-bold mb-4 text-white'>About us</h2>
          <p className='text-gray-300'>
            We a team dedicated to provide the best product and service to our customers.
          </p>
        </div>
        <div>
           <h2 className='text-lg font-bold mb-4 text-white'>Quick links</h2>
           <ul>
            <li><a href=""className="hover:underline text-gray-3000">Home</a></li>
              
             <li><a href=""className="hover:underline text-gray-3000">Wishlist</a></li>

            <li><a href=""className="hover:underline text-gray-3000">Orders</a></li>

           <li><a href=""className="hover:underline text-gray-3000">Profile</a></li>

           </ul>
        </div>
        <div>
          <h2 className='text-lg font-bold mb-4 text-white'>Follow us</h2>

           <ul className="flex span-x-4">
            <li className="flex items-center space-x-1"><FaFacebookF className="text-blue-500" /><a href=""className="hover:underline text-gray-3000 ">Facebook</a></li>
              
             <li className="flex items-center space-x-1" > <FaTwitter className="text-sky-500"/><a href=""className="hover:underline text-gray-3000 ">Twitter</a></li>

            <li className="flex items-center space-x-1">
              <FaInstagram className="text-orange-500" /><a href=""className="hover:underline text-gray-3000 ">Instagram</a></li>

           </ul>
        </div>
        <div className="border-t border-gray-600 pt-6 text-gray-300 text-center mt-6">
          <p>@ 2026. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
};

export default Footer;