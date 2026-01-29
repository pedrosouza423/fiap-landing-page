/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
export default function MockNextImage(props) {
  const {
    alt = "",
    priority, // remove do DOM
    placeholder, // remove do DOM
    blurDataURL, // remove do DOM
    fill, // remove do DOM
    quality, // remove do DOM
    loader, // remove do DOM
    ...rest
  } = props;

  return <img alt={alt} {...rest} />;
}
