
'use client';

import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import {
  Globe2,
  MessageCircle,
  Search,
  ShieldCheck,
  Flag,
  Send,
  Users,
} from 'lucide-react';

type Profile = {
  id: string;
  display_name: string;
  headline: string | null;
  bio: string | null;
  country: string | null;
  avatar_url: string | null;
  portfolio_url: string | null;
  skills: string[];
  guidance_topics: string[];
  role: string;
};

type CommunityComment = {
  id: string;
  author_id: string;
  body: string;
  created_at: string;
  profiles: {
    display_name: string;
  } | null;
};

type Post = {
  id: string;
  body: string;
  created_at: string;
  author_id: string;
  profiles: {
    display_name: string;
    avatar_url: string | null;
    country: string | null;
  } | null;
  community_comments: CommunityComment[];
};

export default function PublicTrustCommunity() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [q, setQ] = useState('');
  const [body, setBody] = useState('');
  const [status, setStatus] = useState('');
  const [commentBodies, setCommentBodies] = useState<Record<string, string>>({});
  const [hasMoreProfiles, setHasMoreProfiles] = useState(false);
  const [profilePage, setProfilePage] = useState(1);
  const [tab, setTab] = useState<'mentors' | 'community'>('mentors');

  async function loadProfiles(
    term = '',
    page = 1,
    append = false
  ) {
    try {
      const response = await fetch(
        `/api/profiles?q=${encodeURIComponent(term)}&page=${page}&limit=40`
      );

      const data = await response.json();

      if (response.ok) {
        setProfiles((current) =>
          append
            ? [...current, ...(data.data || [])]
            : data.data || []
        );

        setProfilePage(page);
        setHasMoreProfiles(Boolean(data.pagination?.has_more));
      }
    } catch {
      setStatus('Unable to load public profiles. Please try again.');
    }
  }

  async function loadPosts() {
    try {
      const response = await fetch('/api/community');
      const data = await response.json();

      if (response.ok) {
        setPosts(data.data || []);
      }
    } catch {
      setStatus('Unable to load community discussions.');
    }
  }

  useEffect(() => {
    loadProfiles();
    loadPosts();
  }, []);

  async function report(
    type: 'profile' | 'post' | 'comment',
    id: string
  ) {
    const reason = window.prompt(
      'Why are you reporting this public content?'
    );

    if (!reason?.trim()) return;

    try {
      const response = await fetch('/api/reports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          target_type: type,
          target_id: id,
          reason: reason.trim(),
        }),
      });

      const data = await response.json();

      setStatus(
        response.ok
          ? 'Report sent to the moderation team.'
          : data.error || 'Sign in to report content.'
      );
    } catch {
      setStatus('Unable to submit report. Please try again.');
    }
  }

  async function submitComment(
    event: FormEvent<HTMLFormElement>,
    postId: string
  ) {
    event.preventDefault();

    const text = commentBodies[postId] || '';

    if (!text.trim()) return;

    try {
      const response = await fetch('/api/community/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          post_id: postId,
          body: text.trim(),
        }),
      });

      const data = await response.json();

      setStatus(
        response.ok
          ? 'Comment submitted for moderation.'
          : data.error || 'Sign in to comment.'
      );

      if (response.ok) {
        setCommentBodies((current) => ({
          ...current,
          [postId]: '',
        }));
      }
    } catch {
      setStatus('Unable to submit comment. Please try again.');
    }
  }

  async function submitPost(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('');

    if (!body.trim()) return;

    try {
      const response = await fetch('/api/community', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          body: body.trim(),
        }),
      });

      const data = await response.json();

      setStatus(
        response.ok
          ? data.message
          : data.error || 'Sign in to contribute.'
      );

      if (response.ok) {
        setBody('');
      }
    } catch {
      setStatus('Unable to submit post. Please try again.');
    }
  }

  return (
    <section id="public-world" className="public-world reveal">
      <div className="container">
        <div className="public-heading">
          <div>
            <p className="eyebrow light">
              07 / WORLDWIDE TRUST & COMMUNITY
            </p>

            <h2>
              Good guidance travels.
              <br />
              <em>Trust travels with it.</em>
            </h2>
          </div>

          <p>
            Discover public mentor portfolios and moderated community
            contributions across countries. Only explicitly public
            profile fields are shown.
          </p>
        </div>

        <div className="trust-grid">
          <article className="trust-card trust-large">
            <span className="trust-index">
              A / WORLDWIDE DISCOVERY
            </span>

            <div className="globe-art">
              <div className="globe-ring" />
              <div className="globe-core">
                <Globe2 size={36} />
              </div>
              <span className="globe-point p1" />
              <span className="globe-point p2" />
              <span className="globe-point p3" />
            </div>

            <h3>
              Visible by choice.
              <br />
              Discoverable worldwide.
            </h3>

            <p>
              Public mentor profiles can be explored globally, with
              contact and private account data excluded from public
              responses.
            </p>

            <span className="trust-foot">
              Country-independent public visibility
            </span>
          </article>

          <article className="trust-card">
            <span className="trust-index">
              B / VERIFIED FEEDBACK
            </span>

            <div className="rating-empty">
              <strong>
                <ShieldCheck size={26} />
              </strong>
              <span>Consultation-linked reviews</span>
            </div>

            <h3>Authenticity before averages.</h3>

            <p>
              Only reviews tied to completed consultations can be
              submitted. They remain pending until a moderator approves
              them.
            </p>

            <span className="trust-foot">
              No fabricated ratings or reviews
            </span>
          </article>

          <article className="trust-card">
            <span className="trust-index">
              C / GLOBAL COMMUNITY
            </span>

            <div className="community-visual">
              <span>Ideas</span>
              <span>Experience</span>
              <span>Perspective</span>
              <i>↗</i>
            </div>

            <h3>Learn beyond borders.</h3>

            <p>
              Public discussions and comments are visible after
              moderation. Members can report inappropriate content.
            </p>

            <span className="trust-foot">
              Reporting and moderation workflow
            </span>
          </article>
        </div>

        <div className="network-panel">
          <div className="network-tabs">
            <button
              type="button"
              className={tab === 'mentors' ? 'active' : ''}
              onClick={() => setTab('mentors')}
            >
              <Users size={15} />
              Public profiles
            </button>

            <button
              type="button"
              className={tab === 'community' ? 'active' : ''}
              onClick={() => setTab('community')}
            >
              <MessageCircle size={15} />
              Community
            </button>
          </div>

          {tab === 'mentors' ? (
            <>
              <div className="network-search">
                <Search size={16} />

                <input
                  value={q}
                  onChange={(event) => {
                    setQ(event.target.value);
                    loadProfiles(event.target.value, 1, false);
                  }}
                  placeholder="Search public names, specialties or countries"
                />
              </div>

              <div className="public-profile-grid">
                {profiles.map((profile) => (
                  <article
                    className="public-profile-card"
                    key={profile.id}
                  >
                    <div className="public-avatar">
                      {profile.avatar_url ? (
                        <img
                          src={profile.avatar_url}
                          alt=""
                        />
                      ) : (
                        (profile.display_name || 'A')
                          .slice(0, 1)
                          .toUpperCase()
                      )}
                    </div>

                    <div className="public-profile-name">
                      {profile.display_name}
                    </div>

                    <p>
                      {profile.headline ||
                        (profile.role === 'mentor'
                          ? 'Mentor'
                          : 'Community member')}
                    </p>

                    <small>
                      {profile.country || 'Worldwide'} ·{' '}
                      {profile.role === 'mentor'
                        ? 'Mentor · Public profile'
                        : 'Student · Public profile'}
                    </small>

                    <div className="tags">
                      {(profile.skills || [])
                        .slice(0, 4)
                        .map((skill) => (
                          <span className="tag" key={skill}>
                            {skill}
                          </span>
                        ))}
                    </div>

                    {profile.portfolio_url && (
                      <a
                        className="apply"
                        href={profile.portfolio_url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        View portfolio ↗
                      </a>
                    )}

                    <button
                      type="button"
                      className="report-link"
                      onClick={() => report('profile', profile.id)}
                    >
                      <Flag size={12} />
                      Report profile
                    </button>
                  </article>
                ))}

                {profiles.length === 0 && (
                  <p className="empty">
                    No public profiles yet. Choose what to share in
                    your profile settings.
                  </p>
                )}

                {hasMoreProfiles && (
                  <button
                    type="button"
                    className="secondary"
                    onClick={() =>
                      loadProfiles(q, profilePage + 1, true)
                    }
                  >
                    Load more public profiles
                  </button>
                )}
              </div>
            </>
          ) : (
            <>
              <form
                className="community-compose"
                onSubmit={submitPost}
              >
                <textarea
                  value={body}
                  onChange={(event) => setBody(event.target.value)}
                  placeholder="Share an experience or helpful insight with the community…"
                  maxLength={4000}
                />

                <div>
                  <small>
                    Posts are reviewed before becoming public. Do not
                    include private contact details.
                  </small>

                  <button
                    type="submit"
                    className="primary"
                    disabled={!body.trim()}
                  >
                    <Send size={14} />
                    Submit for review
                  </button>
                </div>

                {status && (
                  <p role="status">{status}</p>
                )}
              </form>

              <div className="community-feed">
                {posts.map((post) => (
                  <article
                    className="community-post"
                    key={post.id}
                  >
                    <div className="community-post-meta">
                      <strong>
                        {post.profiles ? (
                          <a href={`/members/${post.author_id}`}>
                            {post.profiles.display_name}
                          </a>
                        ) : (
                          'Community member'
                        )}
                      </strong>

                      <span>
                        {post.profiles?.country || 'Worldwide'} ·{' '}
                        {new Date(post.created_at).toLocaleDateString()}
                      </span>
                    </div>

                    <p>{post.body}</p>

                    <div className="post-comments">
                      <MessageCircle size={14} />
                      {post.community_comments?.length || 0}{' '}
                      approved comments
                    </div>

                    {(post.community_comments || []).map((comment) => (
                      <div
                        className="community-comment"
                        key={comment.id}
                      >
                        <strong>
                          {comment.profiles ? (
                            <a href={`/members/${comment.author_id}`}>
                              {comment.profiles.display_name}
                            </a>
                          ) : (
                            'Member'
                          )}
                        </strong>

                        <p>{comment.body}</p>

                        <button
                          type="button"
                          className="report-link"
                          onClick={() =>
                            report('comment', comment.id)
                          }
                        >
                          <Flag size={12} />
                          Report
                        </button>
                      </div>
                    ))}

                    <form
                      className="community-comment-form"
                      onSubmit={(event) =>
                        submitComment(event, post.id)
                      }
                    >
                      <input
                        value={commentBodies[post.id] || ''}
                        onChange={(event) =>
                          setCommentBodies((current) => ({
                            ...current,
                            [post.id]: event.target.value,
                          }))
                        }
                        placeholder="Add a helpful comment…"
                        maxLength={2000}
                      />

                      <button
                        type="submit"
                        className="secondary"
                        disabled={
                          !(commentBodies[post.id] || '').trim()
                        }
                      >
                        Comment
                      </button>
                    </form>

                    <button
                      type="button"
                      className="report-link"
                      onClick={() => report('post', post.id)}
                    >
                      <Flag size={12} />
                      Report discussion
                    </button>
                  </article>
                ))}

                {posts.length === 0 && (
                  <p className="empty">
                    No public discussions yet. Approved posts will
                    appear here.
                  </p>
                )}
              </div>
            </>
          )}
        </div>

        <div className="trust-disclosure">
          <strong>Privacy & authenticity</strong>

          <p>
            Public APIs return only opted-in profile fields. Emails,
            phone numbers, payment details, private meeting links and
            private messages are never included. Reviews require a
            completed consultation and moderation. Connect Supabase
            and apply the included migrations to activate shared
            worldwide data.
          </p>
        </div>
      </div>
    </section>
  );
}

