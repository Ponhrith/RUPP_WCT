import React from "react";
import DefaultLayout from "../layouts/DefaultLayout";

const SamplePostDummyPage = () => {
  return (
    <DefaultLayout title="Sample Post" subTitle="">
      <header
        className="masthead"
        style={{ backgroundImage: "url('assets/img/post-bg.jpg')" }}
      >
        <div className="container position-relative px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-7">
              <div className="post-heading">
                <h1>Man must explore, and this is exploration at its greatest</h1>
                <h2 className="subheading">
                  Problems look mighty small from 150 miles up
                </h2>
                <span className="meta">
                  Posted by <a href="#!">Start Bootstrap</a> on August 24, 2023
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <article className="mb-4">
        <div className="container px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-7">
              <p>
                Never in all their history have men been able truly to conceive
                of the world as one: a single sphere, a globe, having the
                qualities of a globe, a round earth in which all the directions
                eventually meet, in which there is no center because every
                point, or none, is center — an equal earth which all men occupy
                as equals. The airman's earth, if free men make it, will be
                truly round: a globe in practice, not in theory.
              </p>
              {/* ... (Continue with the rest of the content) */}
            </div>
          </div>
        </div>
      </article>

      <footer className="border-top">
        <div className="container px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-7">
              {/* ... (Footer content) */}
            </div>
          </div>
        </div>
      </footer>
    </DefaultLayout>
  );
};

export default SamplePostDummyPage;
