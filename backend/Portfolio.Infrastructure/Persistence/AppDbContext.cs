using Microsoft.EntityFrameworkCore;
using Portfolio.Domain.Entities;

namespace Portfolio.Infrastructure.Persistence;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<ContactSubmission> ContactSubmissions => Set<ContactSubmission>();
    public DbSet<BlogPost>          BlogPosts          => Set<BlogPost>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // ── ContactSubmission ─────────────────────────────────────────────────
        modelBuilder.Entity<ContactSubmission>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).HasMaxLength(100).IsRequired();
            entity.Property(e => e.Email).HasMaxLength(254).IsRequired();
            entity.Property(e => e.Subject).HasMaxLength(200).IsRequired();
            entity.Property(e => e.Message).HasMaxLength(1000).IsRequired();
            entity.Property(e => e.SubmittedAt).IsRequired();
            entity.Property(e => e.IsRead).HasDefaultValue(false);
        });

        // ── BlogPost ──────────────────────────────────────────────────────────
        modelBuilder.Entity<BlogPost>(entity =>
        {
            entity.HasKey(e => e.Id);

            entity.HasIndex(e => e.Slug).IsUnique();
            entity.HasIndex(e => e.Status);      // Fast tab-filter queries

            entity.Property(e => e.Slug).HasMaxLength(200).IsRequired();
            entity.Property(e => e.Title).HasMaxLength(300).IsRequired();
            entity.Property(e => e.Excerpt).HasMaxLength(500);
            entity.Property(e => e.Content).IsRequired();
            entity.Property(e => e.Tags).HasMaxLength(500);
            entity.Property(e => e.Status)
                  .HasMaxLength(20)
                  .IsRequired()
                  .HasDefaultValue(BlogPostStatus.Published);
            entity.Property(e => e.DatePublished).IsRequired();
            entity.Property(e => e.LastSyncedAt).IsRequired();
        });
    }
}
