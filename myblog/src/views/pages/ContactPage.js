import React, { useState } from "react";
import DefaultLayout from "../layouts/DefaultLayout";

const ContactPage = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        const formData = {
            "name": name,
            email,
            phone,
            message
        };
        console.log(formData);
    }

    return (
        <DefaultLayout title="Contact Us" subTitle="">
            <div class="col-md-10 col-lg-8 col-xl-7">
                <p>Want to get in touch? Fill out the form below to send me a message and I will get back to you as soon as possible!</p>
                <div class="my-5">
                    <form onSubmit={onSubmit} id="contactForm">
                        <div class="form-floating">
                            <input onChange={(e) => setName(e.target.value)} class="form-control" id="name" type="text" placeholder="Enter your name..." />
                            <label for="name">Name</label>
                        </div>
                        <div class="form-floating">
                            <input onChange={(e) => setEmail(e.target.value)} class="form-control" id="email" type="email" placeholder="Enter your email..." />
                            <label for="email">Email address</label>
                        </div>
                        <div class="form-floating">
                            <input onChange={(e) => setPhone(e.target.value)} class="form-control" id="phone" type="tel" placeholder="Enter your phone number..." />
                            <label for="phone">Phone Number</label>
                        </div>
                        <div class="form-floating">
                            <textarea onChange={(e) => setMessage(e.target.value)} class="form-control" id="message" placeholder="Enter your message here..."></textarea>
                            <label for="message">Message</label>
                        </div>
                        <br />
                        <div class="d-none" id="submitSuccessMessage">
                            <div class="text-center mb-3">
                                <div class="fw-bolder">Form submission successful!</div>
                                To activate this form, sign up at
                                <br />
                                <a href="https://startbootstrap.com/solution/contact-forms">https://startbootstrap.com/solution/contact-forms</a>
                            </div>
                        </div>

                        <button class="btn btn-primary text-uppercase" type="submit">Send</button>
                    </form>
                </div>
            </div>
        </DefaultLayout>
    );
}

export default ContactPage;