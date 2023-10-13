namespace quiz_service.Attributes;

[AttributeUsage(AttributeTargets.Class)]
public class InjectableProviderAttribute : Attribute
{
    public ServiceLifetime Type;
    
    public InjectableProviderAttribute(ServiceLifetime type = ServiceLifetime.Transient)
    {
        Type = type;
    }
}