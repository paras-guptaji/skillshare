import api from './api';

// Description: Get user profile
// Endpoint: GET /api/profile
// Request: {}
// Response: { user profile data }
export const getUserProfile = () => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        _id: 'current-user',
        name: 'John Doe',
        bio: 'Passionate developer and lifelong learner. I love sharing knowledge and helping others grow in their tech journey.',
        location: 'New York, NY',
        profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
        rating: 4.8,
        totalSessions: 47,
        totalMatches: 24,
        joinedAt: '2023-06-15T10:00:00Z',
        teachingSkills: [
          { name: 'JavaScript', level: 'Expert', endorsements: 15 },
          { name: 'React', level: 'Advanced', endorsements: 12 },
          { name: 'Node.js', level: 'Advanced', endorsements: 8 },
          { name: 'Python', level: 'Intermediate', endorsements: 5 }
        ],
        learningSkills: [
          { name: 'Machine Learning', progress: 65 },
          { name: 'DevOps', progress: 40 },
          { name: 'Mobile Development', progress: 25 }
        ],
        achievements: [
          {
            _id: '1',
            name: 'First Match',
            description: 'Made your first skill match',
            icon: 'heart',
            unlockedAt: '2023-06-20T10:00:00Z'
          },
          {
            _id: '2',
            name: 'Great Teacher',
            description: 'Received 5-star rating from 10 students',
            icon: 'star',
            unlockedAt: '2023-08-15T14:30:00Z'
          },
          {
            _id: '3',
            name: 'Knowledge Seeker',
            description: 'Completed 25 learning sessions',
            icon: 'book',
            unlockedAt: '2023-12-01T09:15:00Z'
          }
        ],
        reviews: [
          {
            _id: '1',
            reviewer: {
              name: 'Sarah Johnson',
              profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face'
            },
            rating: 5,
            comment: 'John is an excellent teacher! He explained React concepts clearly and was very patient with my questions.',
            createdAt: '2024-01-20T15:30:00Z'
          },
          {
            _id: '2',
            reviewer: {
              name: 'Mike Chen',
              profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face'
            },
            rating: 5,
            comment: 'Great session on JavaScript fundamentals. John made complex topics easy to understand.',
            createdAt: '2024-01-15T10:45:00Z'
          }
        ]
      });
    }, 700);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.get('/api/profile');
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
}

// Description: Update user profile
// Endpoint: PUT /api/profile
// Request: { profile data }
// Response: { success: boolean, message: string }
export const updateProfile = (data: any) => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'Profile updated successfully'
      });
    }, 1000);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.put('/api/profile', data);
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
}