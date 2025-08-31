'use client';

import ReCAPTCHA from "react-google-recaptcha";

type Props = {
    onVerify: (token: string | null) => void;
};

export default function ReCAPTCHAForm({ onVerify }: Props) {
    return (
        <div>
            <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                onChange={onVerify}
            />
        </div>
    )
}