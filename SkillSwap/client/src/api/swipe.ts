import api from './api';

// Description: Get profiles for swiping
// Endpoint: GET /api/swipe/profiles
// Request: { filters?: object }
// Response: { profiles: Array<SwipeProfile> }
export const getSwipeProfiles = (filters = {}) => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        profiles: [
          {
            _id: '1',
            name: 'Sarah Johnson',
            age: 28,
            location: 'San Francisco, CA',
            distance: 5,
            bio: 'Passionate about web development and teaching others. Love to share knowledge and learn new technologies!',
            profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
            teachingSkills: [
              { name: 'React', level: 'Expert' },
              { name: 'JavaScript', level: 'Advanced' },
              { name: 'CSS', level: 'Intermediate' }
            ],
            learningSkills: [
              { name: 'Python', level: 'Beginner' },
              { name: 'Machine Learning', level: 'Beginner' }
            ],
            availability: 'Weekday evenings',
            rating: 4.9,
            isOnline: true
          },
          {
            _id: '2',
            name: 'Carlos Rodriguez',
            age: 32,
            location: 'Austin, TX',
            distance: 12,
            bio: 'Native Spanish speaker and language enthusiast. I help people become fluent in Spanish through conversation practice.',
            profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
            teachingSkills: [
              { name: 'Spanish', level: 'Native' },
              { name: 'Guitar', level: 'Advanced' }
            ],
            learningSkills: [
              { name: 'Photography', level: 'Intermediate' },
              { name: 'Digital Marketing', level: 'Beginner' }
            ],
            availability: 'Flexible schedule',
            rating: 4.7,
            isOnline: false
          },
          {
            _id: '3',
            name: 'Emily Chen',
            age: 25,
            location: 'Seattle, WA',
            distance: 8,
            bio: 'UX designer with a passion for creating beautiful and functional interfaces. Always excited to share design knowledge!',
            profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
            teachingSkills: [
              { name: 'UI/UX Design', level: 'Expert' },
              { name: 'Figma', level: 'Advanced' },
              { name: 'Adobe Creative Suite', level: 'Advanced' }
            ],
            learningSkills: [
              { name: 'Frontend Development', level: 'Intermediate' },
              { name: 'Animation', level: 'Beginner' }
            ],
            availability: 'Weekend mornings',
            rating: 4.8,
            isOnline: true
          }
        ]
      });
    }, 1000);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.get('/api/swipe/profiles', { params: filters });
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
}

// Description: Swipe on a profile
// Endpoint: POST /api/swipe
// Request: { profileId: string, action: 'like' | 'pass' | 'superlike' }
// Response: { isMatch: boolean, matchId?: string }
export const swipeProfile = (data: { profileId: string; action: 'like' | 'pass' | 'superlike' }) => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      const isMatch = data.action === 'like' && Math.random() > 0.7; // 30% chance of match
      resolve({
        isMatch,
        matchId: isMatch ? `match_${Date.now()}` : undefined
      });
    }, 500);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.post('/api/swipe', data);
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
}