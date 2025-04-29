
import PageHeader from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";

const LeadershipPage = () => {
  const leadershipTeam = [
    {
      name: "Len Driskell",
      role: "Senior Minister",
      image: "/images/LenDriskell.jpg",
      bio: "Len grew up in central Texas and is a two-time graduate of Abilene Christian University (BA and MDiv). After three years of ministry, he joined the U.S. Navy as a Chaplain, serving Sailors, Coastguardsmen, and Marines in four locations. After 11 years on active duty, he moved to the Navy Reserves in 2019 and joined the SCOC staff as Associate Minister. He became Senior Minister in May 2023. Len and his wife, Kara, have four children: Rachel, Bethany, Naomi, and Sheamus."
    },
    {
      name: "Don Allen Riggs",
      role: "Associate Minister",
      image: "/images/DonRiggs.png",
      bio: "Don Alan was raised in El Paso, Texas, and earned his Bible degree from Freed-Hardeman University in 2019 with a focus on Youth and Family Ministry. He has served as both a youth minister and a pulpit minister, and is now pursuing a Master's in Pastoral Counseling from Heritage Christian University. Don Alan joined SCOC in Fall 2024 as Associate Minister. He and his wife, Hannah, enjoy watching sports, playing tabletop games, building Lego sets, and spending time with their dog, Hank."
    },
    {
      name: "Ann Miller",
      role: "Administrator",
      image: "/images/AnnMiller.jpeg",
      bio: "Ann grew up in Hannibal, Missouri, and graduated from Faulkner University in Montgomery, Alabama. Since moving to the Lowcountry in 1989, she and her husband, Chris, have been active members at SCOC. Over the years, Ann has served in various volunteer roles and ministries, including Youth Secretary from 2015–2020. She became the full-time Church Administrator in October 2023. Ann and Chris have been married for 36 years and have two children and a new grandbaby they adore."
    },
    {
      name: "Kara Driskell",
      role: "Children's Ministry Administrator",
      image: "/images/KaraDriskell.jpeg",
      bio: "Kara joined the SCOC staff in 2019 as the part-time Children's Ministry Administrator. She is married to Len Driskell and is a proud mother of four. For over 20 years, Kara has worked in various educational roles—as a public school teacher, homeschool mom, Girl Scout troop leader, and Sunday school teacher. She is currently a third-grade teacher at Hanahan Elementary and continues to support children's ministry while balancing life as a mom, educator, and ministry partner."
    }
  ];

  const shepherds = [
    {
      name: "David Inman",
      role: "Elder",
      image: "/images/DavidInman.jpg",
      bio: "David has been serving as an elder at Summerville Church of Christ since 2010. He and his wife, Sarah, have been members for over 25 years and have three grown children. As a retired school principal, David now dedicates his time to serving the congregation and mentoring young families."
    },
    {
      name: "Michael Thompson",
      role: "Elder",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
      bio: "Michael has served as an elder since 2015. With a background in counseling, he leads marriage enrichment programs and provides spiritual guidance to members. He and his wife, Rebecca, have been married for 32 years and have four children and six grandchildren."
    },
    {
      name: "Robert Jenkins",
      role: "Elder",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
      bio: "Robert joined the eldership in 2018 after serving as a deacon for 12 years. He works as an engineer and leads the congregation's building committee. He and his wife, Jennifer, have been members since 2001 and have two college-aged children."
    }
  ];

  const deacons = [
    {
      name: "John Williams",
      role: "Deacon - Benevolence",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
      bio: "John oversees the benevolence ministry, coordinating assistance for families in need both within the congregation and the broader community. He has served as a deacon since 2016."
    },
    {
      name: "Daniel Rodriguez",
      role: "Deacon - Youth",
      image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
      bio: "Daniel works alongside the youth minister to coordinate events and mentorship programs for teenagers. A teacher by profession, he has a passion for helping young people grow in their faith."
    },
    {
      name: "Kevin Lewis",
      role: "Deacon - Facilities",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
      bio: "Kevin manages the maintenance and improvement of church facilities and grounds. With his background in construction, he leads volunteer teams in keeping the building functional and welcoming."
    },
    {
      name: "Thomas Baker",
      role: "Deacon - Missions",
      image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
      bio: "Thomas coordinates mission efforts both locally and internationally. He organizes short-term mission trips and maintains relationships with the missionaries supported by the congregation."
    }
  ];

  return (
    <div>
      <PageHeader 
        title="Our Leadership"
        description="Meet the dedicated leaders who guide and serve our church family"
        backgroundImage="https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
      />
      
      {/* Ministry Staff Section */}
      <section className="section-padding bg-white">
        <div className="page-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ministry Staff</h2>
            <div className="w-20 h-1 bg-church-blue mx-auto mb-6"></div>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Our dedicated staff members who serve our congregation daily.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {leadershipTeam.map((leader, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="h-64 overflow-hidden">
                  <img 
                    src={leader.image} 
                    alt={leader.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">{leader.name}</h3>
                  <p className="text-church-blue font-medium mb-3">{leader.role}</p>
                  <p className="text-gray-600">{leader.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shepherds (Elders) Section */}
      <section className="section-padding bg-gray-50">
        <div className="page-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Shepherds</h2>
            <div className="w-20 h-1 bg-church-blue mx-auto mb-6"></div>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              These men serve as elders, providing spiritual leadership and guidance to our church family.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {shepherds.map((shepherd, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="h-64 overflow-hidden">
                  <img 
                    src={shepherd.image} 
                    alt={shepherd.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">{shepherd.name}</h3>
                  <p className="text-church-blue font-medium mb-3">{shepherd.role}</p>
                  <p className="text-gray-600">{shepherd.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deacons Section */}
      <section className="section-padding bg-white">
        <div className="page-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Deacons</h2>
            <div className="w-20 h-1 bg-church-blue mx-auto mb-6"></div>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              These dedicated servants lead various ministries and service areas within our congregation.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {deacons.map((deacon, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="h-64 overflow-hidden">
                  <img 
                    src={deacon.image} 
                    alt={deacon.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">{deacon.name}</h3>
                  <p className="text-church-blue font-medium mb-3">{deacon.role}</p>
                  <p className="text-gray-600">{deacon.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LeadershipPage;
