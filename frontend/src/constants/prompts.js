export const resume = [
         {
          type: "For Enahncing a Resume",
          prompts:[
          "Enhace my resume [Along with your Resume information  for better results]",
          "Can you provide feedback on my resume and key points to improve it?",
          " How can I enhance my resume to better showcase my qualifications and attract potential employers?",
          "Can you suggest specific ways to improve my resume's impact and make it more compelling to hiring managers and send me improved resume?",
          "What are some strategies to strengthen my resume and ensure it effectively highlights my skills and accomplishments?",
          "How can I make my resume stand out in a competitive job market? and Enahnce reusme with addressing competitive job market.",]
         },

         {
          type: "For Providing Feedback on a Resume",
          prompts:[
          "Could you provide detailed feedback on my resume? I’m looking for insights into areas where it could be improved.",
          "Can you review my resume and identify any weaknesses or areas that need improvement?",
          "I’d appreciate your feedback on my resume’s clarity, formatting, and overall effectiveness for a [Job Title] position.",
          "Please analyze my resume and let me know if there are any key areas that might be missing or need enhancement.",
          ],
        },
        {
         type : "For Suggestions and Improvements",
         prompts: [
          "What specific improvements can I make to my resume to better align it with the requirements of a [Job Title] role?",
          "Can you suggest ways to refine my resume to better highlight my achievements and relevant experiences for a [Job Title] position?",
          "What changes would you recommend for improving the keyword optimization and overall structure of my resume?",
          "How can I better tailor my resume to fit the [Job Title] position and make it more appealing to employers?",
          "Please provide actionable suggestions for enhancing the formatting and content of my resume to improve its effectiveness."
         ]
        },
      ];
export const interview = [
        {
            type: "For Interview Preparation",
            prompts: [
                "Can you prepare a list of common interview questions for a [Service Role, e.g., Customer Service Representative], along with practice answers and tips for effective responses?",
                "What are some potential situational and behavioral interview questions for a [Service Role], and how should I prepare for them?",
                "How can I craft strong, impactful answers for a [Service Role] interview, specifically focusing on customer service skills and the job description?",
                "What are common interview questions for a [Service Role], and how can I tailor my answers based on the job description and my experience?",
                "Can you provide role-play scenarios to practice for a [Service Role] interview, focusing on problem-solving and communication skills?",
                "What are some key technical and non-technical questions for a [specific Service Role, e.g., IT Support Specialist] interview, and how should I prepare for them?",
                "How can I improve my customer interaction skills for a [Type of Interview: Phone, Video, In-Person] interview with practical tips and strategies?",
                "I’m concerned about handling challenging customer scenarios during interviews for a [Service Role]. What strategies and examples can help me prepare?",
                "How should I draft a personalized thank-you note for my [Service Role] interview, and what key points should I include based on our discussion?",
                "What specific questions related to service skills and customer satisfaction might come up in a [specific Service Role] interview, and how can I best prepare for them?"
            ]
        },
        {
            type: "For Career Development",
            prompts: [
                "Please provide me with your best career advice and guidance tailored to my profession.",
                "What strategies can I use to advance my career in [Service Industry/Field], and how can I implement them effectively?",
                "How can I set and achieve career goals in [Service Industry/Field], and what steps should I take to create a growth roadmap?",
                "In what ways can I leverage my current customer service experience to transition into a management or supervisory role within [Service Industry]?",
                "What are the most effective networking strategies for professionals in the [Service Industry], and how can I apply them to advance my career?"
            ]
        },
        {
            type: "For Skill Development",
            prompts: [
                "What is a step-by-step roadmap to developing advanced skills in [Service Skill/Technology, e.g., AI/ML SQL, Microservice], and how can I follow it?",
                "Please provide me comprehensive guide to master in [Skill/Technology or Service]",
                "Can you provide a comprehensive learning guide for mastering [Service Skill/Technology], including resources and best practices?",
                "What are the best resources for improving my skills in [Service Skill/Technology] relevant to [Service Role], and how can I use them effectively?",
                "What practical exercises or projects can help me enhance my proficiency in [Service Skill/Technology]?",
                "How can I evaluate my progress and proficiency in [Service Skill/Technology] over time, and what metrics should I use?"
            ]
        }
    ];
    
    export const mock = [
      {
          type: "For Mock Interview",
          prompts: [
              "Simulate a mock interview based on [tech stack/skill/role/job description].",
              "Conduct a mock interview for the [Job Title] position based on the uploaded job description to assess my real-time problem-solving abilities.",
              "Simulate a mock interview for [Job Title] with a focus on [Specific Skills].",
              "Ask me common interview questions for the [Industry] industry and the [Job Title] role.",
              "Pose a challenging technical question related to [programming language or technology].",
              "Act as a difficult interviewer and challenge my technical abilities.",
              "Role-play the closing moments of the interview. Help me practice delivering a strong conclusion and asking impactful questions.",
              "Surprise me! Conduct a mock interview for the [Job Title] position using a scenario you generate based on the industry and role."
          ]
      },
      {
          type: "For Feedback",
          prompts: [
              "Provide immediate feedback on my responses during this mock interview, including suggestions for improvement.",
              "I'd like to get some feedback on how I'm doing so far. Please highlight areas of strength and where I can improve.",
              "Give me feedback on my non-verbal communication during this mock interview and suggest ways to enhance it."
          ]
      },
      {
          type: "For Clarification in between Mock Interview",
          prompts: [
              "I'm not sure I understand the difference between those two. Could you explain?"
          ]
      },
      {
          type: "To End Interview",
          prompts: [
              "To stop the interview or get feedback, click the button `Click me! For Feedback`.",
              "Provide immediate feedback on my non-verbal communication during this mock interview.",
          ]
      }
  ];
  

    /*
    export const resume = [
        "Analyze my resume for [Job Title] and suggest improvements to make it a better fit.",
        "I'm applying for a [Job Title]. Can you review my resume and suggest ways to highlight the skills they're looking for?",
        "Unsure if my resume aligns with the [Job Title] position. Can you analyze it and suggest how to tailor it effectively?",
        "Help me optimize my resume for [Job Title]! I'd like to showcase my skills and experience more effectively.",
        "I uploaded my resume for the [Job Title] position. Could you identify areas where I can strengthen my application?",
        "Looking for feedback on my resume for a [Job Title] role. Can you analyze it for keyword optimization and clarity?",
        "Feeling stuck with my resume for [Job Title]. Any suggestions to make it stand out from the competition?",
        "I'm targeting [Industry].  Review my resume for a [Job Title] position and suggest industry-specific improvements.",
        "Can you help me tailor my resume for a [Job Title] role? I have experience in [Previous Role] but want to emphasize relevant skills.",
        "Uploaded my resume for a [Job Title] position. Would appreciate suggestions on formatting, action verbs, and overall impact."
      ];
export const interview= [
        "Prepare me for a [Job Title] interview! I uploaded my resume and the job description.",
        "Help me craft strong answers for a [Job Title] interview based on my skills and the job description." ,
        "Unsure about common interview questions for [Job Title]. Can you suggest some based on the job description and my experience?",
        "Practice interview for [Job Title]! I'd like to focus on [Specific Skills] mentioned in the job description." ,
        "Analyze the [Job Title] job description and recommend insightful follow-up questions I can ask the interviewer.",
        "Improve my non-verbal communication for a [Type of Interview: Phone, Video, In-Person] interview.",
        "Feeling nervous about salary negotiation for [Job Title]. Can you suggest strategies based on the job description and my experience?",
        "Help me draft a personalized thank-you note for my [Job Title] interview. Share some talking points based on the discussion.",
        "Analyze my interview performance based on the [Job Title] job description. Are there areas I can strengthen?",
        "I'm worried about [Specific Interview Concern] for a [Job Title] interview. Can you offer tips or resources based on the job description?" 

    ]

export const  mock = [
      "Conduct a mock In-Person interview for the [Job Title] position based on the uploaded job description.",
      "Simulate a mock interview for [Job Title] with a focus on [Specific Skills].",
      "Ask me common interview questions for the [Industry] industry and the [Job Title] role.",
      "Challenge me with a difficult behavioral interview question related to [Specific Skill].",
      "Simulate a group interview for the [Job Title] position. Provide feedback on my collaboration and communication skills.",
      "Focus on my salary negotiation skills. Ask me questions as if I were interviewing for the [Job Title] position.",
      "Let's role-play the closing moments of the interview. Help me practice delivering a strong conclusion and asking impactful questions.",
      "Surprise me! Conduct a mock interview for the [Job Title] position using a scenario you generate based on the industry and role.",
      "Can you generate additional follow-up questions based on my responses to [Specific Area] discussed in the mock interview?",
      "Provide immediate feedback on my non-verbal communication during this mock interview.",
      "Analyze my mock interview performance. Did I effectively showcase my skills in [Specific Skill 1] and [Specific Skill 2]?"
    ];*/