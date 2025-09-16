import { createClient } from '@insforge/sdk';
import type {
  User,
  Server,
  Channel,
  Message,
  DMChannel,
  DMMessage,
  ServerMember,
  ApiResponse
} from '../types';

// Initialize Insforge client
const client = createClient({
  baseUrl: 'https://zggzt5ad.us-east.insforge.app'
});

// Auth Services
export const authService = {
  async signUp(email: string, password: string): Promise<ApiResponse<{ user: any; accessToken: string }>> {
    try {
      const { data, error } = await client.auth.signUp({ email, password });
      if (error) throw error;
      if (!data) throw new Error('No data returned');
      return { data };
    } catch (error) {
      return { data: null as any, error: error as string };
    }
  },

  async signIn(email: string, password: string): Promise<ApiResponse<{ user: any; accessToken: string }>> {
    try {
      const { data, error } = await client.auth.signInWithPassword({ email, password });
      if (error) throw error;
      if (!data) throw new Error('No data returned');
      return { data };
    } catch (error) {
      return { data: null as any, error: error as string };
    }
  },

  async getCurrentUser(): Promise<ApiResponse<{ user: any; profile: User }>> {
    try {
      const { data, error } = await client.auth.getCurrentUser();
      if (error) throw error;
      if (!data) throw new Error('No data returned');
      return { data };
    } catch (error) {
      return { data: null as any, error: error as string };
    }
  },

  async setProfile(profile: Partial<User>): Promise<ApiResponse<User>> {
    try {
      const { data, error } = await client.auth.setProfile(profile);
      if (error) throw error;
      return { data };
    } catch (error) {
      return { data: null as any, error: error as string };
    }
  },

  async signOut(): Promise<void> {
    await client.auth.signOut();
  }
};

// User Services
export const userService = {
  async getProfile(userId: string): Promise<ApiResponse<User>> {
    try {
      const { data, error } = await client.auth.getProfile(userId);
      if (error) throw error;
      return { data };
    } catch (error) {
      return { data: null as any, error: error as string };
    }
  },

  async updateProfile(userId: string, updates: Partial<User>): Promise<ApiResponse<User>> {
    try {
      const { data, error } = await client.database
        .from('users')
        .update(updates)
        .eq('id', userId)
        .select()
        .single();
      if (error) throw error;
      return { data };
    } catch (error) {
      return { data: null as any, error: error as string };
    }
  }
};

// Server Services
export const serverService = {
  async createServer(server: { name: string; description?: string; owner_id: string }): Promise<ApiResponse<Server>> {
    try {
      const { data, error } = await client.database
        .from('servers')
        .insert([server])
        .select()
        .single();
      if (error) throw error;
      return { data };
    } catch (error) {
      return { data: null as any, error: error as string };
    }
  },

  async getUserServers(userId: string): Promise<ApiResponse<Server[]>> {
    try {
      const { data, error } = await client.database
        .from('server_members')
        .select('servers!inner(*)')
        .eq('user_id', userId);
      if (error) throw error;
      return { data: (data?.map((item: any) => item.servers) || []) as Server[] };
    } catch (error) {
      return { data: [], error: error as string };
    }
  },

  async joinServer(serverId: string, userId: string): Promise<ApiResponse<ServerMember>> {
    try {
      const { data, error } = await client.database
        .from('server_members')
        .insert([{ server_id: serverId, user_id: userId, role: 'member' }])
        .select()
        .single();
      if (error) throw error;
      return { data };
    } catch (error) {
      return { data: null as any, error: error as string };
    }
  },

  async leaveServer(serverId: string, userId: string): Promise<ApiResponse<void>> {
    try {
      const { error } = await client.database
        .from('server_members')
        .delete()
        .eq('server_id', serverId)
        .eq('user_id', userId);
      if (error) throw error;
      return { data: undefined };
    } catch (error) {
      return { data: undefined, error: error as string };
    }
  },

  async getServerChannels(serverId: string): Promise<ApiResponse<Channel[]>> {
    try {
      const { data, error } = await client.database
        .from('channels')
        .select('*')
        .eq('server_id', serverId)
        .order('created_at');
      if (error) throw error;
      return { data: data || [] };
    } catch (error) {
      return { data: [], error: error as string };
    }
  }
};

// Channel Services
export const channelService = {
  async getServerChannels(serverId: string): Promise<ApiResponse<Channel[]>> {
    try {
      const { data, error } = await client.database
        .from('channels')
        .select('*')
        .eq('server_id', serverId)
        .order('created_at');
      if (error) throw error;
      return { data: data || [] };
    } catch (error) {
      return { data: [], error: error as string };
    }
  },

  async createChannel(channel: { server_id: string; name: string; type: 'text' | 'voice' }): Promise<ApiResponse<Channel>> {
    try {
      const { data, error } = await client.database
        .from('channels')
        .insert([channel])
        .select()
        .single();
      if (error) throw error;
      return { data };
    } catch (error) {
      return { data: null as any, error: error as string };
    }
  }
};

// Message Services
export const messageService = {
  async getChannelMessages(channelId: string, limit = 50): Promise<ApiResponse<Message[]>> {
    try {
      const { data, error } = await client.database
        .from('messages')
        .select('*, users!inner(nickname, avatar_url)')
        .eq('channel_id', channelId)
        .order('created_at', { ascending: false })
        .limit(limit);
      if (error) throw error;
      return { data: data || [] };
    } catch (error) {
      return { data: [], error: error as string };
    }
  },

  async sendMessage(message: { channel_id: string; user_id: string; content?: string; message_type: 'text' | 'image'; file_url?: string }): Promise<ApiResponse<Message>> {
    try {
      const { data, error } = await client.database
        .from('messages')
        .insert([message])
        .select()
        .single();
      if (error) throw error;
      return { data };
    } catch (error) {
      return { data: null as any, error: error as string };
    }
  },

  async deleteMessage(messageId: string): Promise<ApiResponse<void>> {
    try {
      const { error } = await client.database
        .from('messages')
        .delete()
        .eq('id', messageId);
      if (error) throw error;
      return { data: undefined };
    } catch (error) {
      return { data: undefined, error: error as string };
    }
  }
};

// DM Services
export const dmService = {
  async getUserDMChannels(userId: string): Promise<ApiResponse<DMChannel[]>> {
    try {
      const { data, error } = await client.database
        .from('dm_channels')
        .select('*')
        .or(`participant1_id.eq.${userId},participant2_id.eq.${userId}`)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return { data: data || [] };
    } catch (error) {
      return { data: [], error: error as string };
    }
  },

  async createDMChannel(participant1Id: string, participant2Id: string): Promise<ApiResponse<DMChannel>> {
    try {
      const { data, error } = await client.database
        .from('dm_channels')
        .insert([{ participant1_id: participant1Id, participant2_id: participant2Id }])
        .select()
        .single();
      if (error) throw error;
      return { data };
    } catch (error) {
      return { data: null as any, error: error as string };
    }
  },

  async getDMChannelMessages(dmChannelId: string, limit = 50): Promise<ApiResponse<DMMessage[]>> {
    try {
      const { data, error } = await client.database
        .from('dm_messages')
        .select('*, users!inner(nickname, avatar_url)')
        .eq('dm_channel_id', dmChannelId)
        .order('created_at', { ascending: false })
        .limit(limit);
      if (error) throw error;
      return { data: data || [] };
    } catch (error) {
      return { data: [], error: error as string };
    }
  },

  async sendDMMessage(message: { dm_channel_id: string; sender_id: string; content?: string; message_type: 'text' | 'image'; file_url?: string }): Promise<ApiResponse<DMMessage>> {
    try {
      const { data, error } = await client.database
        .from('dm_messages')
        .insert([message])
        .select()
        .single();
      if (error) throw error;
      return { data };
    } catch (error) {
      return { data: null as any, error: error as string };
    }
  }
};

// Storage Services
export const storageService = {
  async uploadImage(file: File): Promise<ApiResponse<{ url: string }>> {
    try {
      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        throw new Error('File size must be less than 5MB');
      }

      const { data, error } = await client.storage
        .from('chat-images')
        .uploadAuto(file);
      if (error) throw error;
      if (!data) throw new Error('Upload failed');
      return { data: { url: data.url } };
    } catch (error) {
      return { data: null as any, error: error as string };
    }
  },

  getPublicUrl(fileName: string): string {
    return client.storage
      .from('chat-images')
      .getPublicUrl(fileName);
  }
};

export default client;