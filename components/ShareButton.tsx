import { PropertyProps } from "@/utilis/PropertycardProps";
import { FaShare } from "react-icons/fa";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

type Props = {
  property: PropertyProps;
};

export default function ShareButton({ property }: Props) {
  const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${property._id}`;
  return (
    <>
      <h3 className="text-xl font-bold text-center pt-2">
        Share this property:
        <div className="flex gap-3 justify-center pb-5">
          <FacebookShareButton
            url={shareUrl}
            title={property.name}
            hashtag={`#${property.type.replace(/\s/g, "")}ForRent`}
          >
            <FacebookIcon size={40} round={true} />
          </FacebookShareButton>
          <TwitterShareButton
            url={shareUrl}
            title={property.name}
            hashtags={[`${property.type.replace(/\s/g, "")}ForRent`]}
          >
            <TwitterIcon size={40} round={true} />
          </TwitterShareButton>
          <WhatsappShareButton
            url={shareUrl}
            title={property.name}
            separator="::"
          >
            <WhatsappIcon size={40} round={true} />
          </WhatsappShareButton>
          <EmailShareButton
            url={shareUrl}
            subject={property.name}
            body={`Check out this property listing ${shareUrl}`}
          >
            <EmailIcon size={40} round={true} />
          </EmailShareButton>
        </div>
      </h3>
    </>
  );
}
