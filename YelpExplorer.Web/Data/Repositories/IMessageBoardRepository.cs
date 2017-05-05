using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using YelpExplorer.Web.Models;

namespace YelpExplorer.Web.Data.Repositories
{
    public interface IMessageBoardRepository
    {
        IQueryable<Topic> GetTopics();
        IQueryable<Topic> GetTopicsIncludingReplies();
        IQueryable<Reply> GetRepliesByTopic(int topicId);

        bool Save();

        bool AddTopic(Topic newTopic);
        bool AddReply(Reply newReply);
    }
}