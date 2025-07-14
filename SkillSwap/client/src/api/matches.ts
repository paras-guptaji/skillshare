import api from './api';

// Description: Get user matches
// Endpoint: GET /api/matches
// Request: {}
// Response: { matches: Array<Match> }
export const getMatches = () => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        matches: [
          {
            _id: '1',
            user: {
              _id: 'user1',
              name: 'Sarah Johnson',
              profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
              location: 'San Francisco, CA',
              isOnline: true
            },
            matchedAt: '2024-01-28T10:00:00Z',
            lastMessage: {
              content: 'Hi! I\'d love to help you learn React. When would be a good time for our first session?',
              timestamp: '2024-01-28T15:30:00Z',
              isRead: false
            },
            unreadCount: 2,
            commonSkills: ['React', 'JavaScript', 'Web Development']
          },
          {
            _id: '2',
            user: {
              _id: 'user2',
              name: 'Carlos Rodriguez',
              profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
              location: 'Austin, TX',
              isOnline: false
            },
            matchedAt: '2024-01-27T14:20:00Z',
            lastMessage: {
              content: '¡Hola! Ready for your Spanish lesson?',
              timestamp: '2024-01-27T16:45:00Z',
              isRead: true
            },
            unreadCount: 0,
            commonSkills: ['Spanish', 'Language Learning']
          },
          {
            _id: '3',
            user: {
              _id: 'user3',
              name: 'Emily Chen',
              profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
              location: 'Seattle, WA',
              isOnline: true
            },
            matchedAt: '2024-01-26T09:15:00Z',
            lastMessage: {
              content: 'Thanks for the great design feedback! Looking forward to our next session.',
              timestamp: '2024-01-26T18:20:00Z',
              isRead: true
            },
            unreadCount: 1,
            commonSkills: ['UI/UX Design', 'Figma', 'Design Systems']
          }
        ]
      });
    }, 600);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.get('/api/matches');
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
}