// সরাসরি কম্পোনেন্টগুলো ইমপোর্ট করে নিচ্ছি
import AIDetailsPage from '../components/MachineLearning/word_01_AI/AIDetailsPage';
import TuringDetailsPage from '../components/MachineLearning/word_02_TuringTest/TuringDetailsPage';
import ExpertDetailsPage from '../components/MachineLearning/word_03_ExpertSystem/ExpertDetailsPage';
import MachineLearningDetailsPage from '../components/MachineLearning/word_04_MachineLearning/MachineLearningDetailsPage';
import TraditionalProgrammingDetails from '../components/MachineLearning/word_05_TraditionalProgramming/TraditionalProgrammingDetails';
import AutomationDetailsPage from '../components/MachineLearning/word_06_Automation/AutomationDetailsPage';
import AlgorithmDetailsPage from '../components/MachineLearning/word_07_Algorithm/AlgorithmDetailsPage';
import DatasetDetailsPage from '../components/MachineLearning/word_08_Dataset/DatasetDetailsPage';
import InputDataDetailsPage from '../components/MachineLearning/word_09_InputData/InputDataDetailsPage';
import FeatureDetailsPage from '../components/MachineLearning/word_10_Feature/FeatureDetailsPage';



export const bookStructure = [
  {
    chapterId: "chapter_01",
    chapterNo: "০১",
    chapterTitle: "এআই-এর অ আ ক খ",
    parts: [
      {
        partId: "part_01",
        partNo: "০১",
        partTitle: "এআই-এর জগত চেনা",
        words: [
          {
            id: "word_01_AI",
            path: "artificial-intelligence",
            title: "কৃত্রিম বুদ্ধিমত্তা (Artificial Intelligence)",
            Component: AIDetailsPage, 
            summary: "যন্ত্রের মানুষের মতো কোনো বিষয়কে 'শনাক্ত' বা 'সিদ্ধান্ত' নেওয়ার জাদুকরী ক্ষমতা।"
          },
          {
            id: "word_02_TuringTest",
            path: "turing-test",
            title: "টুরিং টেস্ট (Turing Test)",
            Component: TuringDetailsPage,
            summary: "মেশিন কি মানুষের মতো চিন্তা করতে পারে? বুদ্ধিমত্তা যাচাইয়ের ঐতিহাসিক পরীক্ষা।"
          },
          {
            id: "word_03_ExpertSystem",
            path: "expert-system",
            title: "এক্সপার্ট সিস্টেম (Expert System)",
            Component: ExpertDetailsPage,
            summary: "রুল-ভিত্তিক এআই যা বিশেষজ্ঞের মতো পরামর্শ দেয়, কিন্তু নিজে থেকে শেখে না।"
          },
          {
            id: "word_04_MachineLearning",
            path: "machine-learning",
            title: "মেশিন লার্নিং (Machine Learning)",
            Component: MachineLearningDetailsPage,
            summary: "নিয়ম না লিখে দিয়ে, কম্পিউটারকে বিশাল ডেটা থেকে নিজে নিজে প্যাটার্ন খুঁজে লজিক তৈরি করতে দেওয়া।"
          },
          {
            id: "word_05_TraditionalProgramming",
            path: "traditional-programming",
            title: "প্রচলিত প্রোগ্রামিং (Traditional Programming)",
            Component: TraditionalProgrammingDetails, 
            summary: "যেখানে মানুষ নিয়ম বানায় আর কম্পিউটার অন্ধের মতো হুকুম তামিল করে।"
          },
          {
            id: "word_06_Automation",
            path: "automation",
            title: "অটোমেশন (Automation)",
            Component: AutomationDetailsPage, 
            summary: "মানুষের সরাসরি হস্তক্ষেপ ছাড়া একটি একঘেয়ে কাজ বারবার এবং নির্ভুলভাবে হওয়ার ব্যবস্থা।"
          }
        ]
      },
      {
        partId: "part_02",
        partNo: "০২",
        partTitle: "পর্ব ২: মেশিনের উপাদান",
        words: [
          {
            id: "word_07_Algorithm",
            path: "algorithm",
            title: "অ্যালগরিদম (Algorithm)",
            Component: AlgorithmDetailsPage,
            summary: "একটি সমস্যা সমাধানের জন্য নির্দিষ্ট পদক্ষেপের একটি সিরিজ।"
          },
          {
            id: "word_08_Dataset",
            path: "dataset",
            title: "ডেটাসেট (Dataset)",
            Component: DatasetDetailsPage, 
            summary: "মেশিন লার্নিং অ্যালগরিদম শেখার জন্য ব্যবহৃত তথ্যের বিশাল ও গোছানো ভাণ্ডার বা জ্বালানি।"
          },
          {
            id: "word_09_InputData",
            path: "input-data",
            title: "ইনপুট ডেটা (Input Data)",
            Component: InputDataDetailsPage, 
            summary: "একটি মেশিনকে কাজ করানোর জন্য নির্দিষ্ট মুহূর্তে যে কাঁচামাল বা ডিজিটাল তথ্য সরবরাহ করা হয়।"
          },
          {
            id: "word_10_Feature",
            path: "feature",
            title: "ফিচার (Feature)",
            Component: FeatureDetailsPage, 
            summary: "আস্ত ইনপুট ডেটা থেকে ছেঁকে বের করা সুনির্দিষ্ট, পরিমাপযোগ্য এবং সিদ্ধান্ত নেওয়ার জন্য প্রয়োজনীয় বৈশিষ্ট্য।"
          }
        ]
      }
    ]
  },
  
];

// হেল্পার ফাংশন
export const getAllWords = () => {
  let allWords = [];
  bookStructure.forEach(chapter => {
    chapter.parts.forEach(part => {
      part.words.forEach(word => {
        allWords.push({
          ...word,
          chapterTitle: chapter.chapterTitle,
          partTitle: part.partTitle
        });
      });
    });
  });
  return allWords;
};