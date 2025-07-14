import api from './api';

// Description: Get dashboard statistics and data
// Endpoint: GET /api/dashboard/stats
// Request: {}
// Response: { totalMatches: number, activeChats: number, upcomingSessions: number, skillsLearned: number, skillsTaught: number, rating: number, achievements: Array, recentActivity: Array }
export const getDashboardStats = () => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        totalMatches: 24,
        activeChats: 8,
        upcomingSessions: 3,
        skillsLearned: 12,
        skillsTaught: 18,
        rating: 4.8,
        achievements: [
          {
            _id: '1',
            name: 'First Match',
            description: 'Made your first skill match',
            icon: 'heart',
            unlockedAt: '2024-01-15T10:00:00Z'
          },
          {
            _id: '2',
            name: 'Great Teacher',
            description: 'Received 5-star rating from 10 students',
            icon: 'star',
            unlockedAt: '2024-01-20T14:30:00Z'
          },
          {
            _id: '3',
            name: 'Knowledge Seeker',
            description: 'Completed 5 learning sessions',
            icon: 'book',
            unlockedAt: '2024-01-25T09:15:00Z'
          }
        ],
        recentActivity: [
          {
            _id: '1',
            type: 'match',
            description: 'New match with Sarah for React Development',
            timestamp: '2024-01-28T16:45:00Z'
          },
          {
            _id: '2',
            type: 'session',
            description: 'Completed Spanish lesson with Carlos',
            timestamp: '2024-01-28T14:00:00Z'
          }
        ]
      });
    }, 800);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.get('/api/dashboard/stats');
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
}