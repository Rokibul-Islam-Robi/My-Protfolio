import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '../components/Navigation';
import { 
  Brain, 
  Target, 
  Trophy, 
  Star,
  Lightning,
  Code,
  ChartLine,
  Puzzle,
  Rocket,
  Award,
  Timer,
  CheckCircle
} from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const ProblemSolving = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      gsap.fromTo('.problem-hero-title', 
        { opacity: 0, y: 60, filter: 'blur(10px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out', delay: 0.3 }
      );

      gsap.fromTo('.problem-hero-subtitle', 
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.6 }
      );

      // Stats animations
      ScrollTrigger.create({
        trigger: '.stats-section',
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo('.stat-item', 
            { opacity: 0, y: 30, scale: 0.8 },
            { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.7)', stagger: 0.1 }
          );
        }
      });

      // Platforms animations
      ScrollTrigger.create({
        trigger: '.platforms-section',
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo('.platform-card', 
            { opacity: 0, x: -40 },
            { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out', stagger: 0.15 }
          );
        }
      });

      // Solutions animations
      ScrollTrigger.create({
        trigger: '.solutions-section',
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo('.solution-card', 
            { opacity: 0, y: 40, filter: 'blur(3px)' },
            { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, ease: 'power3.out', stagger: 0.1 }
          );
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { icon: Trophy, label: 'Problems Solved', value: '500+' },
    { icon: Star, label: 'Contest Rating', value: '1800+' },
    { icon: Lightning, label: 'Fastest Solve', value: '2min' },
    { icon: Brain, label: 'Accuracy Rate', value: '95%' }
  ];

  const platforms = [
    {
      name: 'LeetCode',
      icon: Code,
      solved: 250,
      rating: 1850,
      rank: 'Top 5%',
      color: 'text-orange-400',
      bg: 'from-orange-500/20 to-orange-600/20'
    },
    {
      name: 'HackerRank',
      icon: Target,
      solved: 150,
      rating: 1800,
      rank: 'Top 3%',
      color: 'text-green-400',
      bg: 'from-green-500/20 to-green-600/20'
    },
    {
      name: 'Codeforces',
      icon: Lightning,
      solved: 100,
      rating: 1750,
      rank: 'Top 10%',
      color: 'text-blue-400',
      bg: 'from-blue-500/20 to-blue-600/20'
    }
  ];

  const solutions = [
    {
      title: 'Dynamic Programming - Longest Common Subsequence',
      difficulty: 'Hard',
      platform: 'LeetCode',
      time: '15 min',
      memory: 'O(n*m)',
      language: 'Python',
      description: 'Optimized solution using bottom-up DP with space optimization.',
      code: `def longestCommonSubsequence(text1, text2):
    m, n = len(text1), len(text2)
    dp = [0] * (n + 1)
    
    for i in range(1, m + 1):
        prev = 0
        for j in range(1, n + 1):
            temp = dp[j]
            if text1[i-1] == text2[j-1]:
                dp[j] = prev + 1
            else:
                dp[j] = max(dp[j], dp[j-1])
            prev = temp
    
    return dp[n]`
    },
    {
      title: 'Graph - Shortest Path with Dijkstra',
      difficulty: 'Medium',
      platform: 'HackerRank',
      time: '8 min',
      memory: 'O(V + E)',
      language: 'Java',
      description: 'Efficient implementation using PriorityQueue for optimal performance.',
      code: `public int[] dijkstra(int[][] graph, int start) {
    int n = graph.length;
    int[] distances = new int[n];
    Arrays.fill(distances, Integer.MAX_VALUE);
    distances[start] = 0;
    
    PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[1] - b[1]);
    pq.offer(new int[]{start, 0});
    
    while (!pq.isEmpty()) {
        int[] current = pq.poll();
        int node = current[0], dist = current[1];
        
        if (dist > distances[node]) continue;
        
        for (int neighbor = 0; neighbor < n; neighbor++) {
            if (graph[node][neighbor] > 0) {
                int newDist = dist + graph[node][neighbor];
                if (newDist < distances[neighbor]) {
                    distances[neighbor] = newDist;
                    pq.offer(new int[]{neighbor, newDist});
                }
            }
        }
    }
    return distances;
}`
    },
    {
      title: 'Binary Search - Find Peak Element',
      difficulty: 'Medium',
      platform: 'Codeforces',
      time: '5 min',
      memory: 'O(1)',
      language: 'C++',
      description: 'Elegant binary search solution with optimal space complexity.',
      code: `int findPeakElement(vector<int>& nums) {
    int left = 0, right = nums.size() - 1;
    
    while (left < right) {
        int mid = left + (right - left) / 2;
        
        if (nums[mid] > nums[mid + 1]) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    
    return left;
}`
    }
  ];

  return (
    <div ref={containerRef} className="relative min-h-screen">
      {/* Navigation */}
      <Navigation />
      
      {/* Floating Background Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="glow-orb glow-orb-1 w-64 h-64 bg-neon-blue/20 top-20 left-10"></div>
        <div className="glow-orb glow-orb-2 w-48 h-48 bg-neon-purple/30 top-1/3 right-20"></div>
        <div className="glow-orb glow-orb-3 w-32 h-32 bg-neon-cyan/25 bottom-1/4 left-1/3"></div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 lg:px-8 pt-20">
        <div className="container mx-auto text-center">
          <div className="mb-6">
            <span className="inline-block px-4 py-2 rounded-full bg-neon-blue/10 border border-neon-blue/20 text-neon-blue text-sm font-medium mb-6">
              Problem Solving
            </span>
          </div>
          
          <h1 className="problem-hero-title text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight" style={{ background: 'linear-gradient(135deg, hsl(217 91% 60%) 0%, hsl(271 81% 56%) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Algorithmic Problem Solving
          </h1>
          
          <p className="problem-hero-subtitle text-white text-lg md:text-xl mb-8 max-w-3xl mx-auto">
            A showcase of my problem-solving skills, algorithmic thinking, and competitive programming achievements. 
            From data structures to advanced algorithms, I tackle complex challenges with efficient solutions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="neon-button group">
              View Solutions
              <Code size={20} className="ml-2 inline transition-transform group-hover:translate-x-1" />
            </button>
            <button className="glass-card px-8 py-3 border border-glass-border/30 text-text-primary hover:border-neon-blue/50 transition-all duration-300 flex items-center justify-center">
              <Trophy size={20} className="mr-2" />
              Achievements
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section py-20 px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={stat.label} className="stat-item text-center">
                <div className="glass-card p-6 rounded-xl hover:shadow-glow-blue transition-all duration-300">
                  <stat.icon size={48} className="text-neon-blue mx-auto mb-4" />
                  <div className="text-3xl font-bold text-text-primary mb-2">{stat.value}</div>
                  <div className="text-text-secondary text-sm">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platforms Section */}
      <section className="platforms-section py-20 px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{ background: 'linear-gradient(135deg, hsl(217 91% 60%) 0%, hsl(271 81% 56%) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Coding Platforms
            </h2>
            <p className="text-white text-lg max-w-2xl mx-auto">
              My performance across various competitive programming and coding challenge platforms.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {platforms.map((platform, index) => (
              <div key={platform.name} className="platform-card glass-card p-6 hover:shadow-glow-purple transition-all duration-300 group">
                <div className="flex items-center mb-6">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${platform.bg} mr-4`}>
                    <platform.icon size={32} className={platform.color} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-text-primary">{platform.name}</h3>
                    <p className="text-neon-purple font-medium text-sm">{platform.rank}</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary">Problems Solved:</span>
                    <span className="text-neon-blue font-bold">{platform.solved}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary">Rating:</span>
                    <span className="text-neon-purple font-bold">{platform.rating}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary">Rank:</span>
                    <span className="text-neon-cyan font-bold">{platform.rank}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="solutions-section py-20 px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{ background: 'linear-gradient(135deg, hsl(217 91% 60%) 0%, hsl(271 81% 56%) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Featured Solutions
            </h2>
            <p className="text-white text-lg max-w-2xl mx-auto">
              Selected solutions showcasing different algorithmic approaches and optimization techniques.
            </p>
          </div>
          
          <div className="space-y-8">
            {solutions.map((solution, index) => (
              <div key={index} className="solution-card glass-card p-8">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-text-primary mb-2">{solution.title}</h3>
                    <div className="flex items-center gap-4 text-sm">
                      <span className={`px-3 py-1 rounded-full ${
                        solution.difficulty === 'Hard' ? 'bg-red-500/20 text-red-400' :
                        solution.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-green-500/20 text-green-400'
                      }`}>
                        {solution.difficulty}
                      </span>
                      <span className="text-neon-blue">{solution.platform}</span>
                      <span className="text-text-secondary">{solution.language}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-4 lg:mt-0">
                    <div className="flex items-center gap-1 text-sm text-text-secondary">
                      <Timer size={16} />
                      <span>{solution.time}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-text-secondary">
                      <ChartLine size={16} />
                      <span>{solution.memory}</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-text-secondary mb-6 leading-relaxed">
                  {solution.description}
                </p>
                
                <div className="bg-background-secondary/50 rounded-lg p-4 border border-glass-border/30">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-text-primary font-medium">Solution Code</span>
                    <span className="text-neon-blue text-sm">{solution.language}</span>
                  </div>
                  <pre className="text-sm text-text-secondary overflow-x-auto">
                    <code>{solution.code}</code>
                  </pre>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills & Approach */}
      <section className="py-20 px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <div className="glass-card p-8">
            <h3 className="text-3xl font-bold text-text-primary mb-6 text-center">
              Problem-Solving Approach
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-semibold text-text-primary mb-4">Analytical Thinking</h4>
                <ul className="space-y-2 text-text-secondary">
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-neon-blue" />
                    Break down complex problems into smaller subproblems
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-neon-blue" />
                    Identify patterns and optimal data structures
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-neon-blue" />
                    Analyze time and space complexity trade-offs
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-neon-blue" />
                    Consider edge cases and boundary conditions
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-xl font-semibold text-text-primary mb-4">Optimization Techniques</h4>
                <ul className="space-y-2 text-text-secondary">
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-neon-purple" />
                    Dynamic programming for overlapping subproblems
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-neon-purple" />
                    Binary search for optimization problems
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-neon-purple" />
                    Two-pointer technique for array problems
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-neon-purple" />
                    Sliding window for subarray problems
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 lg:px-8 border-t border-glass-border/20">
        <div className="container mx-auto text-center">
          <p className="text-text-muted mb-4">
            © 2024 TASNIA. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ProblemSolving; 