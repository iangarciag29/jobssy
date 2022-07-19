import Meta from "../../assets/img/metalogo.svg";

const Footer = (): JSX.Element => {
    return <footer
        className="w-5/6 bg-gray-50 font-regular text-xs sm:text-sm text-center py-5 inline-block tracking-wider absolute bottom-0">
        <p>Jobssy | <a href="https://meta.com" target="_blank" rel="noreferrer"><img src={Meta}
                                                                                     className="-mt-1 ml-1 mr-0.5 inline-flex"
                                                                                     alt="Meta Platforms Inc."
                                                                                     width={60}/></a> University
            Engineering Track | Summer 2022.</p>
    </footer>
}

export default Footer;