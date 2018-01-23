import React from "react";
import Background from "./parallax-template/background3.jpg";

const Landing = () => {
  return (
    // <div>
    // Hi Landing</div>
  <div id="splashPage">

    <header className="masthead text-center text-white">
      <div className="masthead-content">
        <div className="container">
          <h1 className="masthead-heading mb-0">wanderBase</h1>
          <h2 className="masthead-subheading mb-0">The Guest Experience - Personalized</h2>
          {/* <!-- <a href="#" className="btn btn-primary btn-xl rounded-pill mt-5">Learn More</a> --> */}
        </div>
      </div>
      <div className="bg-circle-1 bg-circle"></div>
      <div className="bg-circle-2 bg-circle"></div>
      <div className="bg-circle-3 bg-circle"></div>
      <div className="bg-circle-4 bg-circle"></div>
    </header>

    <section>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 order-lg-2">
            <div className="p-5">
              <img className="img-fluid rounded-circle" src="img/01.jpg" alt="" />
            </div>
          </div>
          <div className="col-lg-6 order-lg-1">
            <div className="p-5">
              <h2 className="display-4">Where vacation meets personalization</h2>
                <p>Automation is key in the personalized vacation and villa rental marketplace. Companies that lack automation, struggle to
                  keep up with reservations, and the guest experience drops. For example, a system that keeps up with check-in alerts, work
                  orders, financial statements and concierge requests is critical for running a smooth and hitch-free operation</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="p-5">
              <img className="img-fluid rounded-circle" src="img/02.jpg" alt="" />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="p-5">
              <h2 className="display-4">Proactive, not reactive</h2>
                <p> This list isn't just a list of the top vacation rental sites on the internet; this list is about personalization in travel,
                  something which has become increasingly important over the years. The bespoke travel experience largely affects the luxury
                  sector, but not always. More and more rental companies are realizing that small personalizations, even in the economic
                  sector of vacation rentals, has a big impact on bottom line due to metrics related to consumer satisfaction..</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 order-lg-2">
            <div className="p-5">
              <img className="img-fluid rounded-circle" src="img/03.jpg" alt="" />
            </div>
          </div>
          <div className="col-lg-6 order-lg-1">
            <div className="p-5">
              <h2 className="display-4">Service ...&nbsp;&nbsp; as a service</h2>
                <p>Services and amenities are paramount in the vacation rental space. While the budget market might lack a lot of the so-called
                  frills, the personalized travel market comes with loads of amenities. Companies are often judged by their standard array
                  of services and amenities that include things like round-the-clock concierge services as consumers demand more of a personal
                  touch.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* <!-- Footer --> */}
    <footer className="py-5 bg-black">
      <div className="container">
        <p className="m-0 text-center text-white small">Copyright &copy; Eric Matson 2018</p>
      </div>
      {/* <!-- /.container --> */}
    </footer>
    </div>


  );
};

export default Landing;
