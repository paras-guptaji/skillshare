import api from './api';

// Description: Get user sessions
// Endpoint: GET /api/sessions
// Request: {}
// Response: { sessions: Array<Session> }
export const getSessions = () => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        sessions: [
          {
            _id: '1',
            partner: {
              _id: 'user1',
              name: 'Sarah Johnson',
              profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face'
            },
            skill: 'React Development',
            type: 'learning',
            scheduledAt: '2024-02-01T14:00:00Z',
            duration: 60,
            status: 'scheduled',
            platform: 'Zoom',
            meetingLink: 'https://zoom.us/j/123456789',
            notes: 'Focus on React hooks and state management'
          },
          {
            _id: '2',
            partner: {
              _id: 'user2',
              name: 'Carlos Rodriguez',
              profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face'
            },
            skill: 'Spanish Conversation',
            type: 'learning',
            scheduledAt: '2024-02-03T16:00:00Z',
            duration: 45,
            status: 'scheduled',
            platform: 'Google Meet',
            meetingLink: 'https://meet.google.com/abc-defg-hij'
          },
          {
            _id: '3',
            partner: {
              _id: 'user3',
              name: 'Mike Thompson',
              profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face'
            },
            skill: 'JavaScript Fundamentals',
            type: 'teaching',
            scheduledAt: '2024-01-25T10:00:00Z',
            duration: 60,
            status: 'completed',
            platform: 'Zoom',
            rating: 5,
            feedback: 'Great session! John explained everything clearly and was very patient.'
          },
          {
            _id: '4',
            partner: {
              _id: 'user4',
              name: 'Lisa Wang',
              profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face'
            },
            skill: 'Python Basics',
            type: 'teaching',
            scheduledAt: '2024-01-20T15:30:00Z',
            duration: 90,
            status: 'completed',
            platform: 'Google Meet',
            rating: 4,
            feedback: 'Very helpful session. Looking forward to the next one!'
          }
        ]
      });
    }, 600);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.get('/api/sessions');
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
}

// Description: Reschedule a session
// Endpoint: PUT /api/sessions/:sessionId/reschedule
// Request: { newDateTime: string }
// Response: { success: boolean, message: string }
export const rescheduleSession = (sessionId: string, newDateTime?: string) => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'Session rescheduled successfully'
      });
    }, 500);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.put(`/api/sessions/${sessionId}/reschedule`, { newDateTime });
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
}

// Description: Cancel a session
// Endpoint: DELETE /api/sessions/:sessionId
// Request: {}
// Response: { success: boolean, message: string }
export const cancelSession = (sessionId: string) => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'Session cancelled successfully'
      });
    }, 500);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.delete(`/api/sessions/${sessionId}`);
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
}