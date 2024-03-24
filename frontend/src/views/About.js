import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div>
      <div className="w-full flex flex-col">
        <div className="mb-8 w-full flex-col justify-center space-y-5">
          <div className="flex flex-row w-full justify-center">
            <span className="text-wheatt text-xl font-bold md:text-2xl lg:text-3xl">
              About us
            </span>
          </div>
          <iframe
            className="w-1/2 rounded-lg mx-auto"
            height="350"
            src="https://www.youtube.com/embed/kGGSutb-zWU?si=RNQpcrX58qLczfqA"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
          <div
            class="mt-8 prose dark:prose-invert prose-slate mx-auto lg:prose-lg font-poppins"
            style={{ maxWidth: "55rem" }}
          >
            <p class="lead">
              Welcome to our Olympic Games section. Here, you'll find everything
              you need to know about the Olympic Games, from history to current
              events.
            </p>
            <p>
              The Olympic Games, hosted in the beautiful city of Pyaris, are a
              testament to the enduring spirit of competition and camaraderie.
              Athletes from around the globe will converge here to showcase
              their talent and passion across a myriad of sports disciplines.
            </p>
            <p>
              Pyaris, known for its rich history, cultural diversity, and iconic
              landmarks, provides the perfect backdrop for this extraordinary
              event. From the historic Eiffel Tower to the majestic Louvre
              Museum, visitors will be captivated by the charm and grandeur of
              the city.
            </p>
            <blockquote>
              <p>
                An electrifying convergence of global athleticism set against
                the iconic backdrop of the City of Light, where passion
                illuminates the stage, unity fuels the spirit, and every
                heartbeat echoes the pulse of sporting history in the making.
              </p>
            </blockquote>
            <p>
              As the world comes together in Pyaris, spectators can expect
              thrilling moments, unforgettable performances, and a sense of
              unity that transcends borders. Whether you're a sports enthusiast
              or simply appreciate the spectacle of elite competition, the
              Olympic Games in Pyaris promise to be an experience like no other.
            </p>
            <p>
              At the heart of the Pyaris Olympic 2024 lies a commitment to
              excellence—not only in athletic competition but also in every
              aspect of our operations. From state-of-the-art venues designed to
              showcase the pinnacle of human performance to a meticulously
              crafted schedule that promises unforgettable moments at every
              turn, we have left no stone unturned in our quest to deliver a
              truly world-class experience.
            </p>

            <p>
              For more information about Pyaris Olympic and the games it
              includes,{" "}
              <a href="https://www.Pyaris2024.org/en/">go to this page</a>.
            </p>
            <hr />
            <h2>What are our Missions</h2>
            <p>
              We have five missions linked to delivering our vision and
              reflecting our values of excellence, respect and friendship:
            </p>
            <ol>
              <li>
                ensure the uniqueness and regular celebration of the Olympic
                Games
              </li>
              <li>put athletes at the heart of the Olympic Movement</li>
              <li>
                promote sport and the Olympic values in society, with a focus on
                young people
              </li>
              <li>maximise the performance of the organisation.</li>
              <li>lead and support the Olympic Movement</li>
            </ol>
            <h3>Our values: excellence, respect and friendship</h3>
            <p>
              Our values help bring out the best in us. We strive for excellence
              and encourage people to do the best they can. We promote respect
              in many different ways, respect for yourself, for the rules, for
              your opponents, for the environment and for the public. We
              celebrate friendship, which is the hallmark of the Olympic Games.
            </p>
            <p>Something a wise person once told me about Olympic is:</p>
            <blockquote>
              <p>There is more that unites than divides us.</p>
            </blockquote>

            <h3>Our organisation</h3>
            <p>
              The International Olympic Committee (IOC) is a not-for-profit,
              civil, non-governmental, international organisation. Created on 23
              June 1894, just under two years before the first Olympic Games of
              the modern era in April 1896, the IOC is the supreme authority of
              the Olympic Movement. Its mission is to lead and support the
              Olympic Movement. The IOC administration, which is composed of
              about 700 employees, works to maximise the performance of the
              organisation and implements the decisions taken by the IOC
              Executive Board and the IOC Session.
            </p>
            <p>
              Located in Lausanne since 1915, the IOC has two Olympic centres in
              Lausanne: the Olympic House in Vidy to cater for its
              administration and offer a welcoming meeting place for IOC members
              and the entire Olympic Movement; and The Olympic Museum and
              Olympic Studies Centre, dedicated to general public activities in
              Ouchy.
            </p>
            <p>
              As the leader of the Olympic Movement, the IOC acts as a catalyst
              for collaboration between all parties of the Olympic family, from
              the National Olympic Committees (NOCs), the International Sports
              Federations (IFs), the athletes and the Organising Committees for
              the Olympic Games (OCOGs) to the Worldwide Olympic Partners,
              broadcast partners and United Nations (UN) agencies. It leads a
              wide range of programmes and projects. On this basis, it ensures
              the regular celebration of the Olympic Games, supports all
              affiliated member organisations of the Olympic Movement and
              strongly encourages, by appropriate means, the promotion of the
              Olympic values.
            </p>
            <p>
              The IOC also has two entities in Madrid: Olympic Broadcasting
              Services and Olympic Channel .
            </p>
            <p>
              Olympic Broadcasting Services (OBS) was created by the IOC in 2001
              in order to serve as the host broadcast organisation for all
              Olympic Games, Olympic Winter Games and Youth Olympic Games.
            </p>
            <p>
              The host broadcaster is responsible for delivering the pictures
              and sounds of the Olympic Games to billions of viewers around the
              world. It produces and transmits unbiased live radio and
              television coverage of every sport from every venue.
            </p>
            <p>
              Headquartered in Madrid, Spain, the OBS team includes more than
              160 full-time employees from more than 30 different countries.
            </p>
            <p>
              Find out more about{" "}
              <a href="https://www.obs.tv/home">
                Olympic Broadcasting Services
              </a>
              .
            </p>
            <p>
              Olympic Channel Services (OCS) is responsible for content
              creation, technology infrastructure and operation, digital product
              development and data analysis activities to support the IOC’s
              Digital Strategy and the entire Olympic Movement. OCS produces
              original programming, news, live sports events and highlights to
              provide additional exposure for sports and athletes on
              Olympics.com, the Olympic mobile apps, and social media handles.
            </p>

            <p>
              Also based in Madrid, the OCS team includes just over 100
              full-time employees from 30 different countries.
            </p>
            <p>
              Find out more about jobs at{" "}
              <a href="https://olympics.com/ioc/olympic-channel-boards-of-directors">
                Olympic Channel Services
              </a>{" "}
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
