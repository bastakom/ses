import { Socials } from 'interfaces/themeSettings'
import React, { FC } from 'react'
import {
  FaInstagram,
  FaTwitter,
  FaVimeoV,
  FaYoutube,
  FaLinkedinIn
} from 'react-icons/fa'
import { MdFacebook } from 'react-icons/md'

interface SocialsProps {
  icons?: Socials
}

const Socials: FC<SocialsProps> = ({ icons }) => {
  return (
    <ul className="flex socials">
      {icons?.facebook && (
        <li>
          <a href={`${icons?.facebook}`} className="hover:text-blue-600">
            <MdFacebook />
          </a>
        </li>
      )}
      {icons?.linkedin && (
        <li>
          <a href={`${icons?.linkedin}`}>
            <FaLinkedinIn />
          </a>
        </li>
      )}
      {icons?.instagram && (
        <li>
          <a href={`${icons?.instagram}`} className="hover:text-orange-600">
            <FaInstagram />
          </a>
        </li>
      )}
      {icons?.twitter && (
        <li>
          <a href={`${icons?.twitter}`}>
            <FaTwitter />
          </a>
        </li>
      )}
      {icons?.vimeo && (
        <li>
          <a href={`${icons?.vimeo}`}>
            <FaVimeoV />
          </a>
        </li>
      )}
      {icons?.youtube && (
        <li>
          <a href={`${icons?.youtube}`}>
            <FaYoutube />
          </a>
        </li>
      )}
    </ul>
  )
}

export default Socials
