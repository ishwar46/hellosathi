const responses = {
  "it in business?":
    "IT in business enhances efficiency through automation, secure data management, and effective communication tools. It supports customer relationship management, e-commerce, financial management, cybersecurity, and supply chain optimization. IT fosters innovation with AI, IoT, and blockchain, leading to better decision-making, improved customer service, increased revenue, and robust risk management.",

  "thank you":
    "You're welcome! If you have any more questions, feel free to ask.",

  "how to improve business operations?":
    "Improving business operations can be achieved by optimizing existing processes, adopting new technologies, focusing on customer satisfaction, and continuously analyzing and adapting to changes in the market. Efficiency can also be increased through automation and effective resource management.",

  "latest trends in technology?":
    "Current technology trends include advancements in artificial intelligence, machine learning, Internet of Things (IoT), and blockchain. The rise of 5G technology is also enhancing connectivity and enabling more sophisticated networks.",

  "what is machine learning?":
    "Machine learning is a branch of AI that trains a machine how to learn from data patterns and make decisions with minimal human intervention. Its applications range from predictive analytics to more complex functions like image and speech recognition.",

  "how can i manage stress?":
    "Stress can be managed by maintaining a healthy balance between work and life, engaging in regular physical activity, practicing mindfulness and meditation, and seeking support from friends and family. Proper time management and prioritization also play a crucial role.",

  "marketing strategies?":
    "Effective marketing strategies involve a deep understanding of your target market, utilizing digital marketing tools like SEO, social media marketing, and content marketing. Personalizing customer experiences and analyzing consumer behavior through data also help in crafting successful campaigns.",

  "data privacy?":
    "Data privacy is the right of individuals to have control over how their personal information is collected and used. Ensuring data privacy means adopting strong policies and technologies to protect data from unauthorized access and breaches.",

  "why is team collaboration important?":
    "Team collaboration is crucial because it brings diverse skills and perspectives together, leading to more innovative solutions and increased productivity. Effective collaboration improves problem-solving and can drive a company towards achieving its strategic goals more efficiently.",

  "what is a blockchain?":
    "Blockchain is a technology that allows information to be distributed securely and transparently across multiple nodes in a network without the need for a central authority. It is the backbone of cryptocurrencies like Bitcoin and has applications in fields like finance, supply chain management, and healthcare.",
  "who is sijan kasalawat?":
    "sijan kasalawat is software developer for nepal and also he is a full stack developer working in google . he is CEO of Microsoft company in nepal",
};

const greetResponses = [
  "Hello! How can I assist you today?",
  "Hi there! What can I do for you?",
  "Greetings! How may I help you today?",
];

function getResponse(input) {
  const normalizedInput = input.toLowerCase();

  const greetings = ["hello", "hi", "hey", "hewuu", "helo"];

  if (greetings.some((greeting) => normalizedInput.startsWith(greeting))) {
    return greetResponses[Math.floor(Math.random() * greetResponses.length)];
  } else if (responses[normalizedInput]) {
    return responses[normalizedInput];
  } else {
    return "I'm sorry, I don't have an answer for that.";
  }
}

export default getResponse;
