import Image from "next/image";
import Link from "next/link";
import PropertyDetails from "./PropertyDetails";
import { PropertyProps } from "@/utilis/PropertycardProps";
import { FaArrowLeft } from "react-icons/fa";
import BookmarkButton from "./BookmarkButton";
import ShareButton from "./ShareButton";
import PropertyContactForm from "./PropertyContactForm";
type Props = {
  image: any;
  property: PropertyProps;
};

export default function PropertyHeaderImage({ image, property }: Props) {
  return (
    <>
      <section>
        <div className="container-xl m-auto">
          <div className="grid grid-cols-1">
            <Image
              src={image}
              alt=""
              className="object-cover h-[400px] w-full"
              sizes="100vw"
              height={0}
              width={0}
              priority={true}
            />
          </div>
        </div>
      </section>
      <section>
        <div className="container m-auto py-6 px-6">
          <Link
            href="/properties"
            className="text-blue-500 hover:text-blue-600 flex items-center"
          >
            <FaArrowLeft className="mr-2" /> Back to Properties
          </Link>
        </div>
      </section>
      <section className="bg-blue-50">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
            <PropertyDetails property={property} />

            {/* <!-- Sidebar --> */}
            <aside className="space-y-4">
              <BookmarkButton property={property} />
              <ShareButton property={property} />

              {/* <!-- Contact Form --> */}
              <PropertyContactForm property={property} />
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
