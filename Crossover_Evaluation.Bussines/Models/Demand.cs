
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;

namespace Crossover_Evaluation.Bussines.Models
{
    public class Demand
    {
        [BsonId]
        public ObjectId _Id { get; set; }
        public Book Book { get; set; }
        public User User { get; set; }
        [BsonDateTimeOptions(Kind = DateTimeKind.Local)]
        public DateTime Date { get; set; }
    }
}
