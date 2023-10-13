namespace quiz_service.Exceptions.BaseExceptions
{
    public class CustomException : Exception
    {
        public CustomException(string message)
            : base(message)
        {
        }
    }
}
