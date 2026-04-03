namespace Portfolio.Domain.Entities;

public class ContactSubmission
{
    public Guid Id { get; private set; }
    public string Name { get; private set; } = default!;
    public string Email { get; private set; } = default!;
    public string Message { get; private set; } = default!;
    public DateTime SubmittedAt { get; private set; }
    public bool IsRead { get; private set; }

    private ContactSubmission() { }

    public static ContactSubmission Create(string name, string email, string message)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(name);
        ArgumentException.ThrowIfNullOrWhiteSpace(email);
        ArgumentException.ThrowIfNullOrWhiteSpace(message);

        return new ContactSubmission
        {
            Id = Guid.NewGuid(),
            Name = name.Trim(),
            Email = email.Trim().ToLowerInvariant(),
            Message = message.Trim(),
            SubmittedAt = DateTime.UtcNow,
            IsRead = false,
        };
    }

    public void MarkAsRead() => IsRead = true;
}
