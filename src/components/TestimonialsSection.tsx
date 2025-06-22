import React from 'react';

type TestimonialProps = {
  quote: string;
  name: string;
  role: string;
  image: string;
};

const Testimonial: React.FC<TestimonialProps> = ({ quote, name, role, image }) => {
  return (
    <div className="bg-secondary-light dark:bg-secondary-dark p-8 rounded-xl border border-accent-light/10 dark:border-accent-dark/10 backdrop-blur-sm">
      <p className="text-lg opacity-80 mb-6 text-accent-light dark:text-accent-dark">"{quote}"</p>
      <div className="flex items-center">
        <img
          src={image}
          alt={name}
          className="w-12 h-12 rounded-full object-cover mr-4"
        />
        <div>
          <h4 className="font-semibold text-accent-light dark:text-accent-dark">{name}</h4>
          <p className="opacity-60 text-sm text-accent-light dark:text-accent-dark">{role}</p>
        </div>
      </div>
    </div>
  );
};

const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      quote: "DevDomain transformed our hackathon project's presentation. The judges were impressed by the professional domain.",
      name: "Amit singh",
      role: "Full-Stack Developer",
      image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      quote: "Setup took seconds. Now my portfolio stands out with a clean, professional domain that matches my brand.",
      name: "Ankita Tyagi",
      role: "Cloud Engineer",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      quote: "The perfect solution for our MVP demo to investors. Professional, instant, and hassle-free.",
      name: "Abhishek sharma",
      role: "Founder of GreenHub",
      image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-accent-light dark:text-accent-dark">Trusted by Developers</h2>
          <p className="text-xl opacity-80 max-w-2xl mx-auto text-accent-light dark:text-accent-dark">
            Join thousands of developers who've elevated their projects with DevDomain.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Testimonial
              key={index}
              quote={testimonial.quote}
              name={testimonial.name}
              role={testimonial.role}
              image={testimonial.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;