import api from './api';

// Description: Get chat messages for a match
// Endpoint: GET /api/chat/:matchId/messages
// Request: {}
// Response: { messages: Array<Message>, user: ChatUser }
export const getChatMessages = (matchId: string) => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        messages: [
          {
            _id: '1',
            content: 'Hi! I saw we matched for React development. I\'m excited to help you learn!',
            senderId: 'other-user',
            timestamp: '2024-01-28T10:00:00Z',
            isRead: true,
            type: 'text'
          },
          {
            _id: '2',
            content: 'That\'s awesome! I\'ve been wanting to learn React for a while now. When would be a good time for our first session?',
            senderId: 'current-user',
            timestamp: '2024-01-28T10:05:00Z',
            isRead: true,
            type: 'text'
          },
          {
            _id: '3',
            content: 'How about this weekend? I\'m free Saturday morning or Sunday afternoon.',
            senderId: 'other-user',
            timestamp: '2024-01-28T10:10:00Z',
            isRead: true,
            type: 'text'
          },
          {
            _id: '4',
            content: 'Saturday morning works perfect for me! Should we do a video call?',
            senderId: 'current-user',
            timestamp: '2024-01-28T10:15:00Z',
            isRead: true,
            type: 'text'
          },
          {
            _id: '5',
            content: 'Yes! I\'ll send you a Zoom link. Looking forward to it! 🚀',
            senderId: 'other-user',
            timestamp: '2024-01-28T15:30:00Z',
            isRead: false,
            type: 'text'
          }
        ],
        user: {
          _id: 'user1',
          name: 'Sarah Johnson',
          profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
          isOnline: true,
          lastSeen: '2024-01-28T15:30:00Z'
        }
      });
    }, 800);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.get(`/api/chat/${matchId}/messages`);
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
}

// Description: Send a message in a chat
// Endpoint: POST /api/chat/:matchId/messages
// Request: { content: string, type: 'text' | 'image' | 'file' }
// Response: { message: Message }
export const sendMessage = (data: { matchId: string; content: string; type: 'text' | 'image' | 'file' }) => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        _id: `msg_${Date.now()}`,
        content: data.content,
        senderId: 'current-user',
        timestamp: new Date().toISOString(),
        isRead: false,
        type: data.type
      });
    }, 300);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.post(`/api/chat/${data.matchId}/messages`, {
  //     content: data.content,
  //     type: data.type
  //   });
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
}