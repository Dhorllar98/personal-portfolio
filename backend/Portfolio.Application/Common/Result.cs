namespace Portfolio.Application.Common;

public class Result
{
    public bool IsSuccess { get; }
    public string? Error { get; }
    public Dictionary<string, string[]>? ValidationErrors { get; }
    public bool IsValidationFailure => ValidationErrors is { Count: > 0 };

    protected Result(bool isSuccess, string? error, Dictionary<string, string[]>? validationErrors = null)
    {
        IsSuccess = isSuccess;
        Error = error;
        ValidationErrors = validationErrors;
    }

    public static Result Success() => new(true, null);
    public static Result Failure(string error) => new(false, error);
    public static Result ValidationFailure(Dictionary<string, string[]> errors)
        => new(false, "One or more validation errors occurred.", errors);
}

public class Result<T> : Result
{
    public T? Value { get; }

    protected Result(bool isSuccess, T? value, string? error, Dictionary<string, string[]>? validationErrors = null)
        : base(isSuccess, error, validationErrors)
    {
        Value = value;
    }

    public static Result<T> Success(T value) => new(true, value, null);
    public new static Result<T> Failure(string error) => new(false, default, error);
    public new static Result<T> ValidationFailure(Dictionary<string, string[]> errors)
        => new(false, default, "One or more validation errors occurred.", errors);
}
