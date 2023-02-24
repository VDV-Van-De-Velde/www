import React from "react";
import { 
    FacebookShareButton, 
    FacebookIcon, 
    TwitterIcon,
    TwitterShareButton,
    PinterestShareButton,
    PinterestIcon,
    EmailShareButton,
    EmailIcon,
    LinkedinIcon,
    LinkedinShareButton
} from "next-share";
import { Container } from "./container";
import { Section } from "./section";

export const SocialShare = ({ data, path }) => {
    return (
        <Section className="bg-gray-200">
            <Container className="relative" size="small">
                <p className="border-b-[1px] border-gray-900 text-xl mb-8">Partager ce contenu</p>
                <div className="flex justify-evenly socialbtn flex-wrap">
                    <FacebookShareButton className="flex items-center"
                        url={path}
                        quote={data.title}
                    >
                        <FacebookIcon size={40} />
                        <p>Facebook</p>
                    </FacebookShareButton>
                    <TwitterShareButton className="flex items-center"
                        url={path}
                        title={data.title}
                    >
                        <TwitterIcon size={40}/>
                        <p>Twitter</p>
                    </TwitterShareButton>
                    <PinterestShareButton className="flex items-center"
                        url={path}
                        media={`https://www.blog.vdv-vandevelde.com${data.heroImg}`}
                        description={data.title}
                    >
                        <PinterestIcon size={40}/>
                        <p>Pinterest</p>
                    </PinterestShareButton>
                    <LinkedinShareButton className="flex items-center"
                        url={path}
                    >
                        <LinkedinIcon size={40}/>
                        <p>Linkedin</p>
                    </LinkedinShareButton>
                    <EmailShareButton className="flex items-center"
                        url={path}
                        subject={data.title}
                    >
                        <EmailIcon size={40}/>
                        <p>Email</p>
                    </EmailShareButton>
                </div>
            </Container>
        </Section>
    );
};