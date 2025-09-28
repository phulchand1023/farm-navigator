import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SideMenu from '../components/SideMenu';
import { useSideMenu } from '../context/SideMenuContext';

const TrainingVideos = () => {
  const { setSidePanel } = useSideMenu();
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  useEffect(() => {
    setSidePanel(false);
  }, [setSidePanel]);

  const videos = [
    {
      id: 1,
      title: 'गेहूं की खेती - बुवाई से कटाई तक',
      category: 'crops',
      channel: 'Krishi Jagran',
      duration: '15:30',
      views: '2.5M',
      language: 'Hindi',
      thumbnail: '🌾',
      videoId: 'dQw4w9WgXcQ',
      description: 'गेहूं की उन्नत किस्में, बुवाई का समय, खाद और सिंचाई की जानकारी',
      topics: ['बीज चयन', 'भूमि तैयारी', 'खाद प्रबंधन', 'रोग नियंत्रण']
    },
    {
      id: 2,
      title: 'धान की खेती - नर्सरी से रोपाई तक',
      category: 'crops',
      channel: 'Agriculture Today',
      duration: '18:45',
      views: '1.8M',
      language: 'Hindi',
      thumbnail: '🍚',
      videoId: 'dQw4w9WgXcQ',
      description: 'धान की नर्सरी तैयारी, रोपाई की विधि और पानी का प्रबंधन',
      topics: ['नर्सरी तैयारी', 'रोपाई तकनीक', 'जल प्रबंधन', 'कीट नियंत्रण']
    },
    {
      id: 3,
      title: 'मिट्टी की जांच कैसे करें - घर पर आसान तरीके',
      category: 'soil',
      channel: 'Kisan Tak',
      duration: '12:20',
      views: '950K',
      language: 'Hindi',
      thumbnail: '🧪',
      videoId: 'dQw4w9WgXcQ',
      description: 'मिट्टी की उर्वरता जांचने के घरेलू और वैज्ञानिक तरीके',
      topics: ['pH टेस्ट', 'पोषक तत्व', 'मिट्टी सुधार', 'जैविक खाद']
    },
    {
      id: 4,
      title: 'जैविक खाद बनाने की विधि - कम्पोस्ट और वर्मी कम्पोस्ट',
      category: 'organic',
      channel: 'Organic Farming India',
      duration: '22:15',
      views: '1.2M',
      language: 'Hindi',
      thumbnail: '🌱',
      videoId: 'dQw4w9WgXcQ',
      description: 'घर पर कम्पोस्ट और केंचुआ खाद बनाने की पूरी जानकारी',
      topics: ['कम्पोस्ट बनाना', 'वर्मी कम्पोस्ट', 'हरी खाद', 'गोबर खाद']
    },
    {
      id: 5,
      title: 'ड्रिप सिंचाई सिस्टम - पानी की बचत करें',
      category: 'irrigation',
      channel: 'Modern Farming',
      duration: '16:40',
      views: '800K',
      language: 'Hindi',
      thumbnail: '💧',
      videoId: 'dQw4w9WgXcQ',
      description: 'ड्रिप सिंचाई की स्थापना, फायदे और रखरखाव की जानकारी',
      topics: ['सिस्टम सेटअप', 'पानी की बचत', 'लागत विश्लेषण', 'मेंटेनेंस']
    },
    {
      id: 6,
      title: 'फसल में कीट और रोग की पहचान',
      category: 'pest',
      channel: 'Plant Protection',
      duration: '20:30',
      views: '1.5M',
      language: 'Hindi',
      thumbnail: '🐛',
      videoId: 'dQw4w9WgXcQ',
      description: 'मुख्य फसलों में लगने वाले कीट और रोगों की पहचान और उपचार',
      topics: ['कीट पहचान', 'रोग लक्षण', 'जैविक नियंत्रण', 'दवा छिड़काव']
    },
    {
      id: 7,
      title: 'सब्जी की खेती - टमाटर, आलू, प्याज',
      category: 'vegetables',
      channel: 'Vegetable Farming',
      duration: '25:10',
      views: '2.1M',
      language: 'Hindi',
      thumbnail: '🍅',
      videoId: 'dQw4w9WgXcQ',
      description: 'मुख्य सब्जियों की खेती की संपूर्ण जानकारी और बाजार की मांग',
      topics: ['बीज चयन', 'रोपाई', 'देखभाल', 'मार्केटिंग']
    },
    {
      id: 8,
      title: 'ट्रैक्टर और कृषि यंत्रों का रखरखाव',
      category: 'machinery',
      channel: 'Farm Machinery',
      duration: '19:25',
      views: '750K',
      language: 'Hindi',
      thumbnail: '🚜',
      videoId: 'dQw4w9WgXcQ',
      description: 'ट्रैक्टर और अन्य कृषि यंत्रों की देखभाल और मरम्मत',
      topics: ['इंजन केयर', 'तेल बदलना', 'फिल्टर सफाई', 'टायर केयर']
    },
    {
      id: 9,
      title: 'मधुमक्खी पालन - शहद का व्यवसाय',
      category: 'livestock',
      channel: 'Bee Keeping India',
      duration: '28:15',
      views: '650K',
      language: 'Hindi',
      thumbnail: '🐝',
      videoId: 'dQw4w9WgXcQ',
      description: 'मधुमक्खी पालन शुरू करने की पूरी जानकारी और मुनाफा',
      topics: ['बॉक्स सेटअप', 'रानी मक्खी', 'शहद निकालना', 'बिजनेस प्लान']
    },
    {
      id: 10,
      title: 'सरकारी योजनाओं का लाभ कैसे उठाएं',
      category: 'schemes',
      channel: 'Kisan Yojana',
      duration: '14:50',
      views: '1.1M',
      language: 'Hindi',
      thumbnail: '🏛️',
      videoId: 'dQw4w9WgXcQ',
      description: 'PM-KISAN, PMFBY और अन्य सरकारी योजनाओं के लिए आवेदन प्रक्रिया',
      topics: ['PM-KISAN', 'फसल बीमा', 'KCC कार्ड', 'सब्सिडी योजना']
    },
    {
      id: 11,
      title: 'मौसम के अनुसार फसल चयन',
      category: 'weather',
      channel: 'Weather Farming',
      duration: '17:35',
      views: '890K',
      language: 'Hindi',
      thumbnail: '🌤️',
      videoId: 'dQw4w9WgXcQ',
      description: 'रबी, खरीफ और जायद फसलों का सही समय और चयन',
      topics: ['रबी फसल', 'खरीफ फसल', 'जायद फसल', 'मौसम पूर्वानुमान']
    },
    {
      id: 12,
      title: 'फसल की मार्केटिंग - बेहतर दाम कैसे पाएं',
      category: 'marketing',
      channel: 'Farm Business',
      duration: '21:40',
      views: '1.3M',
      language: 'Hindi',
      thumbnail: '💰',
      videoId: 'dQw4w9WgXcQ',
      description: 'फसल बेचने के तरीके, मंडी भाव और ऑनलाइन प्लेटफॉर्म की जानकारी',
      topics: ['मंडी भाव', 'e-NAM', 'FPO बिक्री', 'कोल्ड स्टोरेज']
    }
  ];

  const categories = [
    { id: 'all', name: 'सभी वीडियो', icon: '🎥' },
    { id: 'crops', name: 'फसल उत्पादन', icon: '🌾' },
    { id: 'soil', name: 'मिट्टी परीक्षण', icon: '🧪' },
    { id: 'organic', name: 'जैविक खेती', icon: '🌱' },
    { id: 'irrigation', name: 'सिंचाई', icon: '💧' },
    { id: 'pest', name: 'कीट नियंत्रण', icon: '🐛' },
    { id: 'vegetables', name: 'सब्जी उत्पादन', icon: '🍅' },
    { id: 'machinery', name: 'कृषि यंत्र', icon: '🚜' },
    { id: 'livestock', name: 'पशुपालन', icon: '🐝' },
    { id: 'schemes', name: 'सरकारी योजना', icon: '🏛️' },
    { id: 'weather', name: 'मौसम', icon: '🌤️' },
    { id: 'marketing', name: 'मार्केटिंग', icon: '💰' }
  ];

  const filteredVideos = selectedCategory === 'all' 
    ? videos 
    : videos.filter(video => video.category === selectedCategory);

  return (
    <>
      <SideMenu />
      <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100 px-6 py-10 pt-32">
        <div className="max-w-6xl mx-auto">
          <motion.h1
            className="text-4xl font-bold text-purple-700 text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            🎥 कृषि प्रशिक्षण वीडियो
          </motion.h1>

          <motion.p
            className="text-lg text-gray-600 text-center mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            हिंदी में उपलब्ध बेहतरीन कृषि प्रशिक्षण वीडियो - विशेषज्ञों से सीखें
          </motion.p>

          {/* Category Filter */}
          <motion.div
            className="bg-white p-4 rounded-xl shadow-lg mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-3 py-2 rounded-lg font-semibold text-sm transition-all ${
                    selectedCategory === category.id
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.icon} {category.name}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Videos Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((video, index) => (
              <motion.div
                key={video.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                {/* Video Thumbnail */}
                <div className="relative bg-gradient-to-br from-purple-400 to-pink-400 h-48 flex items-center justify-center">
                  <div className="text-6xl">{video.thumbnail}</div>
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                    {video.duration}
                  </div>
                  <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold">
                    {video.language}
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                    {video.title}
                  </h3>
                  
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm text-gray-600">{video.channel}</p>
                    <p className="text-sm text-gray-500">{video.views} views</p>
                  </div>

                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {video.description}
                  </p>

                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-700 text-sm mb-2">मुख्य विषय:</h4>
                    <div className="flex flex-wrap gap-1">
                      {video.topics.slice(0, 3).map((topic, idx) => (
                        <span key={idx} className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <a
                      href={`https://youtube.com/watch?v=${video.videoId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded text-sm font-semibold text-center"
                    >
                      ▶️ देखें
                    </a>
                    <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded text-sm font-semibold">
                      📱 शेयर करें
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Learning Tips */}
          <motion.div
            className="bg-white p-6 rounded-xl shadow-lg mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4">📚 सीखने के लिए सुझाव</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl mb-2">📝</div>
                <h4 className="font-semibold text-blue-700">नोट्स बनाएं</h4>
                <p className="text-sm text-blue-600">महत्वपूर्ण बातों को लिखकर रखें</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="text-2xl mb-2">🔄</div>
                <h4 className="font-semibold text-green-700">दोहराएं</h4>
                <p className="text-sm text-green-600">जरूरी वीडियो को दोबारा देखें</p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl mb-2">🤝</div>
                <h4 className="font-semibold text-orange-700">साझा करें</h4>
                <p className="text-sm text-orange-600">अन्य किसानों के साथ जानकारी बांटें</p>
              </div>
            </div>
          </motion.div>

          {/* Popular Channels */}
          <motion.div
            className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl shadow-lg mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h3 className="text-xl font-bold text-purple-800 mb-4">🌟 लोकप्रिय कृषि चैनल</h3>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="bg-white p-3 rounded-lg text-center">
                <h4 className="font-bold text-gray-700">Krishi Jagran</h4>
                <p className="text-sm text-gray-600">फसल उत्पादन विशेषज्ञ</p>
              </div>
              <div className="bg-white p-3 rounded-lg text-center">
                <h4 className="font-bold text-gray-700">Agriculture Today</h4>
                <p className="text-sm text-gray-600">आधुनिक खेती तकनीक</p>
              </div>
              <div className="bg-white p-3 rounded-lg text-center">
                <h4 className="font-bold text-gray-700">Kisan Tak</h4>
                <p className="text-sm text-gray-600">व्यावहारिक समाधान</p>
              </div>
              <div className="bg-white p-3 rounded-lg text-center">
                <h4 className="font-bold text-gray-700">Organic Farming</h4>
                <p className="text-sm text-gray-600">जैविक खेती गुरु</p>
              </div>
            </div>
          </motion.div>

          <div className="text-center mt-8">
            <Link to="/main-dashboard">
              <motion.button
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg"
                whileHover={{ scale: 1.05 }}
              >
                ← डैशबोर्ड पर वापस जाएं
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default TrainingVideos;