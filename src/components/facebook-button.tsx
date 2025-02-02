"use client"
import {FacebookIcon, FacebookShareButton} from "next-share";

export default function FacebookButton({ url, description } : { url: string, description: string }) {
  return (
      <FacebookShareButton
          url={url}
          quote={description}
          hashtag={'#emarket'}
      >
        <FacebookIcon size={32} round />
      </FacebookShareButton>
  )
}
