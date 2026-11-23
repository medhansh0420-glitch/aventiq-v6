
'use client';

import { useState } from 'react';
import { OPPORTUNITIES } from '../opportunities';
import OpportunityCard from '../OpportunityCard';
import MentorMarketplace from '../MentorMarketplace';
import PublicTrustCommunity from '../PublicTrustCommunity';

export default function Home() {
  const [saved, setSaved] = useState<string[]>([]);

  function toggleSave(id: string) {
    setSaved(current =>
      current.includes(id)
        ? current.filter(item => item !== id)
        : [...current, id]
    );
  }

  return (
    <main>
      <header style={{padding:'24px 5%',display:'flex',justifyContent:'space-between',alignItems:'center',borderBottom:'1px solid var(--border)'}}>
        <a href="/" style={{fontSize:25,fontWeight:800,textDecoration:'none',color:'var(--text)'}}>AventIQ<span style={{color:'#64b5ff'}}>.</span></a>
        <nav style={{display:'flex',gap:20,flexWrap:'wrap'}}>
          <a href="#opportunities">Opportunities</a>
          <a href="#mentors">Mentors</a>
          <a href="#community">Community</a>
        </nav>
      </header>

      <section style={{padding:'90px 7%',background:'var(--background)'}}>
        <p style={{color:'#64b5ff',fontWeight:700}}>YOUR FUTURE, WITHOUT BORDERS</p>
        <h1 style={{fontSize:'clamp(42px,7vw,76px)',maxWidth:850,lineHeight:1.05}}>
          Discover opportunities.<br />Build your next chapter.
        </h1>
        <p style={{maxWidth:620,fontSize:18,color:'var(--muted)',lineHeight:1.7}}>
          Explore global opportunities, connect with mentors and grow through a worldwide community.
        </p>
        <a href="#opportunities" style={{display:'inline-block',padding:'14px 22px',background:'#64b5ff',color:'#07111f',borderRadius:10,fontWeight:700}}>
          Explore opportunities ↗
        </a>
      </section>

      <section id="opportunities" style={{padding:'65px 5%'}}>
        <h2>Explore opportunities</h2>
        <p style={{color:'var(--muted)'}}>Discover opportunities from across the world.</p>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:18,marginTop:25}}>
          {OPPORTUNITIES.map(opportunity => (
            <OpportunityCard
              key={opportunity.id}
              opportunity={opportunity}
              saved={saved.includes(opportunity.id)}
              onSave={() => toggleSave(opportunity.id)}
            />
          ))}
        </div>
      </section>

      <section id="mentors" style={{padding:'55px 5%'}}>
        <MentorMarketplace />
      </section>

      <section id="community" style={{padding:'55px 5%'}}>
        <PublicTrustCommunity />
      </section>

      <footer style={{padding:30,textAlign:'center',borderTop:'1px solid var(--border)'}}>
        © {new Date().getFullYear()} AventIQ. Discover beyond boundaries.
      </footer>
    </main>
  );
}
