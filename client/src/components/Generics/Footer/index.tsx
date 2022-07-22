import Meta from "../../../assets/img/metalogo.svg";

const Footer = (): JSX.Element => {
  return (
    <footer className="font-regular absolute bottom-0 inline-block w-full bg-gray-50 py-5 text-center text-xs tracking-wider text-gray-600 sm:text-sm md:w-5/6">
      <p>
        Jobssy |{" "}
        <a href="https://meta.com" target="_blank" rel="noreferrer">
          <img
            src={Meta}
            className="-mt-1 ml-1 mr-0.5 inline-flex"
            alt="Meta Platforms Inc."
            width={60}
          />
        </a>{" "}
        University Engineering Track | Summer 2022.
      </p>
    </footer>
  );
};

export default Footer;
