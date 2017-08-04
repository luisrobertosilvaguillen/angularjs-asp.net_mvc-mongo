using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Crossover_Evaluation.Bussines.Models
{
    public class Book
    {
        [BsonId]
        public ObjectId _Id { get; set; }
        public string Title { get; set; }
        public string Publisher { get; set; }
        public string Description { get; set; }
        public string[] Authors { get; set; }
    }
}
