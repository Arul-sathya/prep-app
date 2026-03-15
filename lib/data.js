// Auto-extracted prep data
const notesData = [
  {id:'n-ml1',cat:'c-ml',tag:'CORE',title:'Bias, Loss & Regularization',items:[
    {s:'Bias-Variance'},
    'High bias = underfitting (model too simple). High variance = overfitting (memorises training noise).',
    'Total error = bias² + variance + irreducible noise. You minimise the sum — not each in isolation.',
    {s:'Regularization'},
    'L1 (Lasso): |w| penalty → sparse weights → feature selection',
    'L2 (Ridge): w² penalty → shrinks uniformly, never zero',
    'Elastic Net: α·L1 + (1−α)·L2 — best of both worlds',
    'Dropout: zero p% neurons → ensemble-like generalisation at test time',
    'Batch Norm: normalise activations → reduces internal covariate shift',
    {s:'Loss Functions'},
    'Cross-entropy: −Σy·log(p̂) — classification',
    'MSE/MAE — regression; Huber: MSE for small errors, MAE for outliers',
    'Focal Loss: −α(1−p̂)^γ·log(p̂) — imbalanced classes (down-weights easy examples)',
  ]},
  {id:'n-ml2',cat:'c-ml',tag:'CORE',title:'Optimizers & Metrics',items:[
    {s:'Optimizers'},
    'Adam: adaptive per-param learning rate using 1st/2nd gradient moment estimates — default for DL',
    'AdamW: Adam + decoupled weight decay — go-to for transformer fine-tuning',
    'SGD + momentum: can match Adam final accuracy on CNNs with careful tuning',
    'LR schedule: warmup (start low, ramp up) → cosine decay (smooth drop) — standard for transformers',
    {s:'Metrics'},
    'Precision=TP/(TP+FP) · Recall=TP/(TP+FN)',
    'F1=harmonic mean · AUC-ROC=threshold-independent (area under TPR/FPR curve)',
    'micro-AUROC: pool all classes into one calculation → your BeatNet result: 0.976',
    'MCC: best single metric for imbalanced binary classification',
    'AP (Average Precision): area under the Precision-Recall curve',
  ]},
  {id:'n-ml3',cat:'c-ml',tag:'CORE',title:'Tree Models & Ensembles',items:[
    {s:'Decision Trees'},
    'Split nodes by Gini impurity or Information Gain (entropy reduction)',
    'Regularise with max_depth, min_samples_split to prevent overfitting',
    {s:'Random Forest (Bagging)'},
    'Train N trees on different random bootstrap samples + random feature subsets',
    'Averaging predictions reduces variance without increasing bias — parallelisable',
    {s:'Gradient Boosting'},
    'Each new tree corrects the residual errors of the ensemble so far',
    'XGBoost: L1/L2 reg, column subsampling — your L&T EduTech project',
    'LightGBM: histogram-based splits, leaf-wise growth — faster on large data',
    'CatBoost: ordered target encoding for high-cardinality categoricals',
    {s:'Key XGB Hyperparameters'},
    'max_depth 3–6 · learning_rate 0.01–0.1 · n_estimators + early stopping',
    'subsample / colsample_bytree: 0.7–0.9 for stochasticity',
  ]},
  {id:'n-dl1',cat:'c-dl',tag:'BEGINNER FRIENDLY',title:'What Is a Transformer? (Plain English)',items:[
    {s:'The Core Idea'},
    'A Transformer is a neural network that processes sequences (words, tokens, pixels) by letting every element look at every other element simultaneously — this is called "attention".',
    'Older models (RNNs) had to process words one at a time left-to-right. Transformers process the whole sequence at once → much faster to train on modern GPUs.',
    {s:'Three Things to Know'},
    'Attention: each word asks "which other words should I focus on?" and gets a weighted mix of their information.',
    'Positional encoding: since Transformers see all words at once, they need extra info telling them the word order.',
    'Stacked layers: one Transformer block runs attention + a small MLP. You stack 12–96 of these blocks for a full LLM.',
    {s:'Attention Formula (simplified)'},
    'Every token creates Q (query = what I want), K (key = what I offer), V (value = what I give).',
    'Score = Q·Kᵀ / √d_k → softmax (converts to probabilities) → multiply by V → weighted sum of information.',
    'Scale by √d_k to prevent softmax from saturating when d_k is large.',
    {fig:`<svg viewBox="0 0 340 310" xmlns="http://www.w3.org/2000/svg" font-family="JetBrains Mono,monospace" font-size="10">
  <defs><marker id="arrt" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#6a6a80"/></marker></defs>
  <rect x="120" y="10" width="100" height="26" rx="3" fill="#1a1a24" stroke="#3a3a50"/>
  <text x="170" y="27" fill="#b8b8cc" text-anchor="middle">Input x</text>
  <line x1="170" y1="36" x2="170" y2="54" stroke="#3a3a50" stroke-width="1.5" marker-end="url(#arrt)"/>
  <rect x="110" y="55" width="120" height="26" rx="3" fill="#161828" stroke="#818cf8" stroke-opacity=".5"/>
  <text x="170" y="72" fill="#818cf8" text-anchor="middle">LayerNorm</text>
  <line x1="170" y1="81" x2="170" y2="99" stroke="#3a3a50" stroke-width="1.5" marker-end="url(#arrt)"/>
  <rect x="90" y="100" width="160" height="34" rx="3" fill="#161828" stroke="#818cf8"/>
  <text x="170" y="117" fill="#818cf8" text-anchor="middle" font-size="10.5">Multi-Head Attention</text>
  <text x="170" y="129" fill="#6a6a80" text-anchor="middle" font-size="8.5">softmax(QKt / sqd) times V</text>
  <path d="M115,46 Q60,46 60,118 Q60,144 93,144" stroke="#f0c040" stroke-width="1" fill="none" stroke-dasharray="3,3" opacity=".6"/>
  <text x="34" y="100" fill="#f0c040" font-size="8" opacity=".7">+ skip</text>
  <line x1="170" y1="134" x2="170" y2="152" stroke="#3a3a50" stroke-width="1.5" marker-end="url(#arrt)"/>
  <rect x="110" y="153" width="120" height="26" rx="3" fill="#1a1a24" stroke="#3a3a50"/>
  <text x="170" y="170" fill="#b8b8cc" text-anchor="middle">Add + Norm</text>
  <line x1="170" y1="179" x2="170" y2="197" stroke="#3a3a50" stroke-width="1.5" marker-end="url(#arrt)"/>
  <rect x="90" y="198" width="160" height="34" rx="3" fill="#161828" stroke="#818cf8"/>
  <text x="170" y="215" fill="#818cf8" text-anchor="middle" font-size="10.5">Feed-Forward Network</text>
  <text x="170" y="227" fill="#6a6a80" text-anchor="middle" font-size="8.5">Linear(d to 4d) → GELU → Linear(4d to d)</text>
  <path d="M225,144 Q285,144 285,216 Q285,248 252,248" stroke="#f0c040" stroke-width="1" fill="none" stroke-dasharray="3,3" opacity=".6"/>
  <line x1="170" y1="232" x2="170" y2="250" stroke="#3a3a50" stroke-width="1.5" marker-end="url(#arrt)"/>
  <rect x="110" y="251" width="120" height="26" rx="3" fill="#1a1a24" stroke="#3a3a50"/>
  <text x="170" y="268" fill="#b8b8cc" text-anchor="middle">Add + Norm</text>
  <line x1="170" y1="277" x2="170" y2="295" stroke="#3a3a50" stroke-width="1.5" marker-end="url(#arrt)"/>
  <text x="170" y="308" fill="#6a6a80" text-anchor="middle">× N layers = full LLM</text>
</svg>`,cap:'Transformer Encoder Block'},
    {s:'Why Multi-Head?'},
    'Run attention h times in parallel with separate learned projections (weights). Each "head" specialises in a different kind of relationship (syntax, coreference, semantics). Concat all heads → project back.',
    {s:'Residual + LayerNorm'},
    'Each sub-layer does: output = LayerNorm(x + Sublayer(x)). The "+x" is the residual — it creates a direct gradient path so the network can train 100+ layers without vanishing gradients.',
  ]},
  {id:'n-dl2',cat:'c-dl',tag:'ARCHITECTURE',title:'BERT vs GPT vs T5',items:[
    {s:'BERT — Encoder-only'},
    'Bidirectional: each token sees ALL other tokens simultaneously',
    'Best for: classification, NER, extractive QA, text embeddings',
    {s:'GPT — Decoder-only'},
    'Causal: each token only sees previous tokens (masked attention)',
    'Pre-trained to predict the next token → naturally generates text',
    'Best for: generation, code, chat — scales best at large compute',
    {s:'T5 — Encoder-Decoder'},
    'Text-to-Text: every task framed as string → string',
    'Encoder reads context bidirectionally; decoder generates output causally',
    'Best for: translation, summarisation, structured QA',
    {s:'Modern Trend'},
    'Decoder-only dominates modern LLMs (LLaMA, Mistral, GPT-4)',
    'Encoder-only still best for embeddings + classification with limited data',
  ]},
  {id:'n-dl3',cat:'c-dl',tag:'ARCHITECTURE',title:'ViT, U-Net & SHAP',items:[
    {s:'ViT (Vision Transformer) — THYRO-ViT'},
    'Split image into N×N patches → flatten + embed each patch → treat as a sequence of tokens',
    'Prepend a [CLS] learnable token → add position embeddings → pass through Transformer encoder',
    'The [CLS] token output = image representation for classification',
    'Data-hungry: needs large datasets, worse than CNN on small data',
    {s:'U-Net — BeatNet 1D'},
    'Encoder: downsamples the input (extracts high-level features). Decoder: upsamples back to original resolution.',
    'Skip connections copy feature maps from encoder directly to matching decoder layers — preserves detail lost during downsampling.',
    '1D U-Net: same idea but on a 1D time-series (ECG signal) instead of a 2D image',
    {fig:`<svg viewBox="0 0 340 180" xmlns="http://www.w3.org/2000/svg" font-family="JetBrains Mono,monospace" font-size="9">
  <defs>
    <marker id="arr5" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
      <path d="M0,0 L6,3 L0,6 Z" fill="#6a6a80"/>
    </marker>
    <marker id="arr5s" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
      <path d="M0,0 L6,3 L0,6 Z" fill="#f0c040"/>
    </marker>
  </defs>
  <!-- Encoder blocks -->
  <rect x="10" y="20" width="52" height="30" rx="3" fill="#1a1a24" stroke="#22d3ee"/>
  <text x="36" y="33" fill="#22d3ee" text-anchor="middle">Conv1</text>
  <text x="36" y="44" fill="#6a6a80" text-anchor="middle" font-size="7.5">L×64</text>

  <line x1="62" y1="35" x2="82" y2="35" stroke="#3a3a50" stroke-width="1.3" marker-end="url(#arr5)"/>
  <text x="72" y="30" fill="#6a6a80" font-size="7.5">↓pool</text>

  <rect x="84" y="30" width="52" height="30" rx="3" fill="#1a1a24" stroke="#22d3ee"/>
  <text x="110" y="43" fill="#22d3ee" text-anchor="middle">Conv2</text>
  <text x="110" y="54" fill="#6a6a80" text-anchor="middle" font-size="7.5">L/2×128</text>

  <line x1="136" y1="45" x2="154" y2="45" stroke="#3a3a50" stroke-width="1.3" marker-end="url(#arr5)"/>
  <text x="144" y="40" fill="#6a6a80" font-size="7.5">↓pool</text>

  <!-- Bottleneck -->
  <rect x="156" y="40" width="54" height="30" rx="3" fill="#161828" stroke="#818cf8"/>
  <text x="183" y="53" fill="#818cf8" text-anchor="middle">Bottleneck</text>
  <text x="183" y="64" fill="#6a6a80" text-anchor="middle" font-size="7.5">L/4×256</text>

  <!-- Decoder -->
  <line x1="210" y1="45" x2="228" y2="45" stroke="#3a3a50" stroke-width="1.3" marker-end="url(#arr5)"/>
  <text x="219" y="40" fill="#6a6a80" font-size="7.5">↑up</text>

  <rect x="230" y="30" width="52" height="30" rx="3" fill="#1a1a24" stroke="#22d3ee"/>
  <text x="256" y="43" fill="#22d3ee" text-anchor="middle">Dec2</text>
  <text x="256" y="54" fill="#6a6a80" text-anchor="middle" font-size="7.5">L/2×128</text>

  <line x1="282" y1="35" x2="300" y2="35" stroke="#3a3a50" stroke-width="1.3" marker-end="url(#arr5)"/>
  <text x="290" y="30" fill="#6a6a80" font-size="7.5">↑up</text>

  <rect x="302" y="20" width="30" height="30" rx="3" fill="#1a1a24" stroke="#22d3ee"/>
  <text x="317" y="33" fill="#22d3ee" text-anchor="middle">Dec1</text>
  <text x="317" y="44" fill="#6a6a80" text-anchor="middle" font-size="7.5">L×64</text>

  <!-- Skip connections -->
  <path d="M36,50 Q36,105 256,105 Q256,60 256,60" stroke="#f0c040" stroke-width="1.2" fill="none" stroke-dasharray="3,2" marker-end="url(#arr5s)" opacity=".8"/>
  <path d="M110,60 Q110,120 317,120 Q317,50 317,50" stroke="#f0c040" stroke-width="1.2" fill="none" stroke-dasharray="3,2" marker-end="url(#arr5s)" opacity=".6"/>
  <text x="170" y="118" fill="#f0c040" font-size="8" opacity=".8">skip connections (preserve detail)</text>

  <!-- Output -->
  <line x1="317" y1="50" x2="317" y2="70" stroke="#3a3a50" stroke-width="1.3" marker-end="url(#arr5)"/>
  <rect x="292" y="70" width="54" height="22" rx="3" fill="#241a14" stroke="#fb923c"/>
  <text x="319" y="85" fill="#fb923c" text-anchor="middle">Segments</text>

  <!-- Input label -->
  <line x1="36" y1="20" x2="36" y2="6" stroke="#3a3a50" stroke-width="1.3"/>
  <text x="36" y="5" fill="#6a6a80" text-anchor="middle">Raw ECG</text>
</svg>`,cap:'1D U-Net — BeatNet Delineation Stage'},
    {s:'SHAP Explainability'},
    'Assigns each input feature a "credit score" for the prediction, based on Shapley values from game theory.',
    'DeepSHAP is an efficient version for deep networks. Used in THYRO-ViT to show which image patches drove predictions — essential for clinical trust.',
  ]},
  {id:'n-dl4',cat:'c-dl',tag:'EFFICIENCY',title:'Flash Attention & KV Cache',items:[
    {s:'The Problem with Standard Attention'},
    'Computing attention requires storing an n×n matrix of scores (n = sequence length). For n=8K tokens, that is 64M numbers per layer per head — very expensive in GPU memory.',
    {s:'Flash Attention'},
    'Does not store the full n×n matrix. Instead, computes attention in small tiles that fit in fast on-chip memory (SRAM), avoiding slow GPU DRAM reads/writes.',
    'The math is identical — just computed in a smarter order. Flash Attention 2 is 2× faster and used in nearly every modern LLM (LLaMA, Mistral, Falcon).',
    {s:'KV Cache'},
    'Problem: when generating text token by token, the model normally recomputes K and V vectors for all previous tokens at every step.',
    'KV Cache: save those K and V vectors after computing them once. On each new token, only compute new K and V. Result: generation is much faster.',
    'The cache grows as the sequence gets longer — quantising it (INT8) saves memory.',
    {s:'Context Length Extension'},
    'RoPE scaling and YaRN let models handle longer sequences than they were trained on, without retraining.',
  ]},
  {id:'n-rag1',cat:'c-rag',tag:'YOUR STRENGTH',title:'RAG — Retrieval & Indexing',items:[
    {s:'FAISS Index Types'},
    'IndexFlatL2: exact brute-force — 100% recall, use for <1M vecs or as baseline',
    'IndexIVF: cluster space → search only nprobe nearest clusters — fast, approximate',
    'IndexHNSW: graph-based — very fast queries, high recall, high memory',
    'IndexIVF+PQ: compression via product quantization — billions of vectors in RAM',
    {s:'Chunking Strategies'},
    'Fixed-size: simple, may split mid-sentence',
    'Sentence-aware: split on boundaries — better coherence',
    'Overlap: 50–100 token sliding window reduces boundary artifacts',
    'Parent-child: retrieve small chunks, return larger parent for context',
    {fig:`<svg viewBox="0 0 340 230" xmlns="http://www.w3.org/2000/svg" font-family="JetBrains Mono,monospace" font-size="9.5">
  <defs>
    <marker id="arr3" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
      <path d="M0,0 L6,3 L0,6 Z" fill="#6a6a80"/>
    </marker>
  </defs>
  <!-- OFFLINE section -->
  <rect x="8" y="8" width="148" height="130" rx="4" fill="none" stroke="#3a3a50" stroke-dasharray="4,3"/>
  <text x="82" y="21" fill="#6a6a80" text-anchor="middle" font-size="8" letter-spacing="1">OFFLINE  (index)</text>
  <!-- Docs -->
  <rect x="22" y="30" width="80" height="22" rx="3" fill="#1a1a24" stroke="#3a3a50"/>
  <text x="62" y="44" fill="#b8b8cc" text-anchor="middle">Documents</text>
  <line x1="62" y1="52" x2="62" y2="66" stroke="#3a3a50" stroke-width="1.5" marker-end="url(#arr3)"/>
  <!-- Chunk -->
  <rect x="22" y="67" width="80" height="22" rx="3" fill="#1a1a24" stroke="#3a3a50"/>
  <text x="62" y="81" fill="#b8b8cc" text-anchor="middle">Chunk + Embed</text>
  <line x1="62" y1="89" x2="62" y2="103" stroke="#3a3a50" stroke-width="1.5" marker-end="url(#arr3)"/>
  <!-- FAISS -->
  <rect x="22" y="104" width="80" height="22" rx="3" fill="#241a14" stroke="#fb923c"/>
  <text x="62" y="118" fill="#fb923c" text-anchor="middle">FAISS Index</text>

  <!-- ONLINE section -->
  <rect x="184" y="8" width="148" height="214" rx="4" fill="none" stroke="#3a3a50" stroke-dasharray="4,3"/>
  <text x="258" y="21" fill="#6a6a80" text-anchor="middle" font-size="8" letter-spacing="1">ONLINE  (retrieve + gen)</text>
  <!-- Query -->
  <rect x="198" y="30" width="120" height="22" rx="3" fill="#1a1a24" stroke="#3a3a50"/>
  <text x="258" y="44" fill="#b8b8cc" text-anchor="middle">User Query</text>
  <line x1="258" y1="52" x2="258" y2="66" stroke="#3a3a50" stroke-width="1.5" marker-end="url(#arr3)"/>
  <!-- Embed query -->
  <rect x="198" y="67" width="120" height="22" rx="3" fill="#1a1a24" stroke="#3a3a50"/>
  <text x="258" y="81" fill="#b8b8cc" text-anchor="middle">Embed Query</text>
  <line x1="258" y1="89" x2="258" y2="103" stroke="#3a3a50" stroke-width="1.5" marker-end="url(#arr3)"/>
  <!-- Retrieve -->
  <rect x="198" y="104" width="120" height="22" rx="3" fill="#241a14" stroke="#fb923c"/>
  <text x="258" y="118" fill="#fb923c" text-anchor="middle">ANN Search → top-k</text>
  <line x1="258" y1="126" x2="258" y2="140" stroke="#3a3a50" stroke-width="1.5" marker-end="url(#arr3)"/>
  <!-- Prompt -->
  <rect x="198" y="141" width="120" height="22" rx="3" fill="#1a1a24" stroke="#3a3a50"/>
  <text x="258" y="155" fill="#b8b8cc" text-anchor="middle">Build Prompt</text>
  <line x1="258" y1="163" x2="258" y2="177" stroke="#3a3a50" stroke-width="1.5" marker-end="url(#arr3)"/>
  <!-- LLM -->
  <rect x="198" y="178" width="120" height="32" rx="3" fill="#161828" stroke="#818cf8"/>
  <text x="258" y="194" fill="#818cf8" text-anchor="middle">LLM Generate</text>
  <text x="258" y="204" fill="#6a6a80" text-anchor="middle" font-size="8">grounded answer</text>

  <!-- Arrow from FAISS to online retrieve -->
  <path d="M102,115 Q160,115 198,115" stroke="#fb923c" stroke-width="1.2" fill="none" stroke-dasharray="3,2" marker-end="url(#arr3)" opacity=".7"/>
</svg>`,cap:'RAG Pipeline — Offline Indexing + Online Retrieval'},
    {s:'Retrieval Metrics'},
    'Recall@k: fraction of relevant docs in top-k · MRR: rank of first correct result · NDCG: rank-order quality',
  ]},
  {id:'n-rag2',cat:'c-rag',tag:'ADVANCED',title:'RAG — Advanced Patterns',items:[
    {s:'Query Rewriting'},
    'HyDE: LLM writes a hypothetical ideal answer → embed THAT → retrieve (closes query-document gap)',
    'Multi-query: generate N reworded variants → retrieve each → merge with RRF',
    {s:'Hybrid Search'},
    'Dense (bi-encoder) finds semantic matches. Sparse (BM25) finds exact keyword matches.',
    'RRF fusion: score = Σ 1/(k + rank_i) — combines both lists without needing trained weights',
    {s:'Reranking'},
    'Stage 1 bi-encoder retrieves top-50 (fast). Stage 2 cross-encoder reranks to top-5 (accurate).',
    {s:'RAGAS Evaluation'},
    'Faithfulness · Answer Relevance · Context Relevance · Context Recall',
  ]},
  {id:'n-rag3',cat:'c-rag',tag:'LLM SYSTEMS',title:'LLMs — Training & Prompting',items:[
    {s:'Alignment'},
    'SFT → Reward Model → PPO (RLHF). DPO skips the reward model step entirely — simpler and widely used.',
    {fig:`<svg viewBox="0 0 340 130" xmlns="http://www.w3.org/2000/svg" font-family="JetBrains Mono,monospace" font-size="9.5">
  <defs>
    <marker id="arr6" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
      <path d="M0,0 L6,3 L0,6 Z" fill="#6a6a80"/>
    </marker>
  </defs>
  <!-- Stage 1 SFT -->
  <rect x="8" y="18" width="88" height="44" rx="3" fill="#161828" stroke="#818cf8"/>
  <text x="52" y="35" fill="#818cf8" text-anchor="middle">1. SFT</text>
  <text x="52" y="47" fill="#6a6a80" text-anchor="middle" font-size="8">Base LLM + demos</text>
  <text x="52" y="57" fill="#6a6a80" text-anchor="middle" font-size="8">→ instruction follower</text>
  <!-- Arrow -->
  <line x1="96" y1="40" x2="116" y2="40" stroke="#3a3a50" stroke-width="1.5" marker-end="url(#arr6)"/>
  <!-- Stage 2 RM -->
  <rect x="118" y="18" width="100" height="44" rx="3" fill="#161828" stroke="#f87171"/>
  <text x="168" y="35" fill="#f87171" text-anchor="middle">2. Reward Model</text>
  <text x="168" y="47" fill="#6a6a80" text-anchor="middle" font-size="8">pref. pairs A&gt;B</text>
  <text x="168" y="57" fill="#6a6a80" text-anchor="middle" font-size="8">→ scalar reward</text>
  <!-- Arrow -->
  <line x1="218" y1="40" x2="238" y2="40" stroke="#3a3a50" stroke-width="1.5" marker-end="url(#arr6)"/>
  <!-- Stage 3 PPO -->
  <rect x="240" y="18" width="90" height="44" rx="3" fill="#161828" stroke="#4ade80"/>
  <text x="285" y="35" fill="#4ade80" text-anchor="middle">3. PPO / RL</text>
  <text x="285" y="47" fill="#6a6a80" text-anchor="middle" font-size="8">policy gets reward</text>
  <text x="285" y="57" fill="#6a6a80" text-anchor="middle" font-size="8">+ KL penalty</text>

  <!-- DPO alternative -->
  <rect x="118" y="80" width="212" height="32" rx="3" fill="#1a1a24" stroke="#f0c040" stroke-opacity=".5" stroke-dasharray="3,2"/>
  <text x="224" y="93" fill="#f0c040" text-anchor="middle" font-size="9">DPO alternative</text>
  <text x="224" y="105" fill="#6a6a80" text-anchor="middle" font-size="8">skip RM entirely — direct loss on (preferred, rejected) pairs</text>
  <path d="M168,62 L168,80" stroke="#f0c040" stroke-width="1" stroke-dasharray="2,2" opacity=".6" marker-end="url(#arr6)"/>
</svg>`,cap:'RLHF vs DPO Training Pipeline'},
    {s:'Prompting'},
    'CoT: "Let\'s think step by step" → forces the model to externalise its reasoning',
    'ReAct: Reason → Act (call a tool) → Observe → repeat — your FinAgent uses this',
    {s:'Sampling'},
    'Temperature T: higher = more random. Top-p: sample from smallest set summing to probability p.',
    '"Lost in the middle": LLMs attend poorly to content deep in a long context — put critical info first or last.',
  ]},
  {id:'n-kg1',cat:'c-kg',tag:'FUNDAMENTALS',title:'Knowledge Graphs',items:[
    {s:'Core'},
    'Triple: (head, relation, tail). Property graph (Neo4j): nodes + edges with arbitrary key-value properties.',
    'BFS: shortest path. DFS: topological sort, cycle detection.',
    {s:'Multi-hop (ArXivMind)'},
    'LLM decides which graph edges to traverse → beam search keeps top-k paths. Your system: 500+ nodes NetworkX + FAISS + Groq.',
    {s:'Embeddings'},
    'TransE: h+r≈t (translation). RotatE: relation as rotation in complex space.',
    'GNN: message passing — each node aggregates features from its k-hop neighbourhood.',
    {s:'Neo4j & CourtIQ'},
    'Cypher: MATCH (p:Player)-[:PLAYS_FOR]->(t:Team) RETURN p,t',
    'GDS: PageRank (influence), Louvain (community detection). GraphCypherQAChain: NL→Cypher→LLM answer.',
  ]},
  {id:'n-inf1',cat:'c-inf',tag:'INTERNSHIP XP',title:'Inference Optimization',items:[
    {s:'ONNX → TensorRT (Open Weaver: 24% latency reduction)'},
    'ONNX freezes the model computation graph for hardware-specific optimisation.',
    'TensorRT builds a GPU-specific engine: fuses adjacent layers, runs kernel autotuning, applies FP16/INT8.',
    {s:'DeepSpeed ZeRO'},
    'Stage 1: partition optimizer states (~4× memory). Stage 2: +gradients (~8×). Stage 3: +model params (enables trillion-param models).',
    'ZeRO-Offload: spills optimizer state to CPU RAM for extreme savings.',
    {s:'Quantization'},
    'PTQ: quantize after training — fast, small accuracy loss. QAT: simulate quant during training — better quality.',
    'GPTQ / AWQ: INT4 weight-only quantization for LLMs — near FP16 quality.',
    {s:'Other Techniques'},
    'Speculative decoding: small draft model proposes tokens → large model verifies → 2–3× faster generation.',
    'Continuous batching: dynamically combine requests mid-generation to keep GPU utilisation high.',
  ]},
  {id:'n-sys1',cat:'c-sys',tag:'HIGH PRIORITY',title:'ML Systems Design',items:[
    {s:'7-Step Framework'},
    '1.Clarify(QPS,SLA) 2.Define(problem type) 3.Data pipeline 4.Model 5.Training infra 6.Serving 7.Monitoring',
    {s:'Feature Store'},
    'Offline: S3+Parquet (training, high throughput). Online: Redis/DynamoDB (<10ms reads at inference).',
    'Point-in-time correctness: only use features available AT prediction time — prevents data leakage.',
    {s:'Monitoring'},
    'Data drift: PSI >0.2 = significant. Concept drift: model performance on labeled holdout degrades.',
    'Retraining: scheduled weekly OR event-driven when drift threshold exceeded.',
    {s:'Deployment'},
    'Canary (5→25→100%) · Blue/Green (instant rollback) · Shadow mode (parallel without prod impact)',
    'Tools: MLflow/W&B · Triton/vLLM · Evidently AI/Arize',
  ]},
  {id:'n-ft1',cat:'c-ft',tag:'BEGINNER FRIENDLY',title:'Fine-Tuning Plain English',items:[
    {s:'What Is Fine-Tuning?'},
    'A pre-trained model (like LLaMA) has already learned from trillions of text tokens. Fine-tuning means continuing to train it on a smaller, task-specific dataset so it specialises for your use case.',
    'Think of it like: the model already knows how to write English fluently. Fine-tuning teaches it to write in the style of a doctor, a finance analyst, or a customer support agent.',
    {s:'The Catch'},
    'Training ALL the weights on a small dataset often causes "catastrophic forgetting" — the model forgets everything it knew before and just memorises your small dataset.',
    'This is why we usually fine-tune only a small subset of weights.',
    {s:'LoRA — the Smart Way to Fine-Tune'},
    'Instead of changing the big original weight matrix W, LoRA freezes W completely and adds two tiny new matrices A and B alongside it.',
    'The update is: ΔW = A × B, where A and B are much smaller than W (controlled by "rank" r, usually 4–64). Only A and B are trained.',
    'This means you are updating ~0.1–1% of the parameters instead of 100%. At inference, you can merge A×B back into W so there is zero speed penalty.',
    {fig:`<svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg" font-family="JetBrains Mono,monospace" font-size="10">
  <defs><marker id="arrl" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#6a6a80"/></marker></defs>
  <text x="20" y="105" fill="#b8b8cc">x</text>
  <line x1="30" y1="102" x2="55" y2="102" stroke="#3a3a50" stroke-width="1.5" marker-end="url(#arrl)"/>
  <line x1="55" y1="102" x2="55" y2="60" stroke="#3a3a50" stroke-width="1" stroke-dasharray="2,2"/>
  <line x1="55" y1="102" x2="55" y2="145" stroke="#fb7185" stroke-width="1" stroke-dasharray="2,2"/>
  <rect x="60" y="44" width="100" height="36" rx="3" fill="#1a1a24" stroke="#4a4a60"/>
  <text x="110" y="60" fill="#b8b8cc" text-anchor="middle">W (frozen)</text>
  <text x="110" y="73" fill="#6a6a80" text-anchor="middle" font-size="8.5">d x k — never updated</text>
  <line x1="160" y1="62" x2="200" y2="62" stroke="#3a3a50" stroke-width="1.5" marker-end="url(#arrl)"/>
  <text x="220" y="66" fill="#b8b8cc">Wx</text>
  <rect x="60" y="128" width="44" height="34" rx="3" fill="#241418" stroke="#fb7185"/>
  <text x="82" y="144" fill="#fb7185" text-anchor="middle">A</text>
  <text x="82" y="155" fill="#6a6a80" text-anchor="middle" font-size="8">d x r</text>
  <line x1="104" y1="145" x2="124" y2="145" stroke="#fb7185" stroke-width="1.5" marker-end="url(#arrl)"/>
  <rect x="124" y="128" width="44" height="34" rx="3" fill="#241418" stroke="#fb7185"/>
  <text x="146" y="144" fill="#fb7185" text-anchor="middle">B</text>
  <text x="146" y="155" fill="#6a6a80" text-anchor="middle" font-size="8">r x k</text>
  <line x1="168" y1="145" x2="200" y2="145" stroke="#fb7185" stroke-width="1.5" marker-end="url(#arrl)"/>
  <text x="210" y="149" fill="#fb7185">BAx·a/r</text>
  <circle cx="240" cy="102" r="14" fill="#1a1a24" stroke="#f0c040"/>
  <text x="240" y="107" fill="#f0c040" text-anchor="middle" font-size="16">+</text>
  <line x1="224" y1="66" x2="232" y2="91" stroke="#3a3a50" stroke-width="1.2"/>
  <line x1="224" y1="145" x2="232" y2="114" stroke="#fb7185" stroke-width="1.2"/>
  <line x1="254" y1="102" x2="290" y2="102" stroke="#3a3a50" stroke-width="1.5" marker-end="url(#arrl)"/>
  <text x="298" y="106" fill="#b8b8cc">h</text>
  <text x="160" y="192" fill="#6a6a80" text-anchor="middle" font-size="8.5">Only A and B train. Merge at inference: W = W + BA·a/r</text>
</svg>`,cap:'LoRA: Low-Rank Adaptation'},
    {s:'QLoRA — Fine-Tuning on Consumer GPUs'},
    'QLoRA compresses the frozen base model to 4-bit precision (saving ~4× memory), then runs LoRA on top.',
    'This lets you fine-tune a 70 billion parameter model on a single GPU that would normally not fit it.',
    {s:'When to Fine-Tune vs RAG'},
    'Use RAG when the knowledge is dynamic (updates frequently) or too large to bake into weights.',
    'Use fine-tuning when you need to change the model\'s style, tone, format, or behaviour — things RAG cannot fix.',
  ]},
  {id:'n-ft2',cat:'c-ft',tag:'TECHNIQUES',title:'Fine-Tuning — Data & Tools',items:[
    {s:'Data Preparation'},
    'Format responses as chat templates (system/user/assistant turns). Quality beats quantity: 500 curated examples beat 50K noisy ones.',
    'Deduplicate aggressively — exact + fuzzy matches. Always tokenise with the target model\'s own tokenizer.',
    {s:'Training Config'},
    'LoRA LR: 1e-4 to 3e-4 · Full fine-tune LR: 1e-5 · Epochs: 1–3 (watch val loss)',
    'Gradient accumulation simulates larger batches when GPU memory is limited.',
    {s:'Overfitting Signals'},
    'Train loss keeps dropping but val loss rises after epoch 2 — add more data or stop early.',
    {s:'Tools'},
    'TRL (SFTTrainer, DPOTrainer) · Axolotl (config-driven, widely used) · Unsloth (2× faster LoRA)',
  ]},
  {id:'n-lc1',cat:'c-lc',tag:'FRAMEWORK',title:'LangChain & LangGraph',items:[
    {s:'LCEL'},
    'chain = prompt | llm | parser — lazy eval, streaming built-in, declarative',
    'RunnableParallel: run multiple chains at once, merge their outputs',
    {s:'Agents'},
    '@tool decorator: register any Python function as an agent tool',
    'AgentExecutor: orchestrates the ReAct loop with a max_iterations safety cap',
    'Your FinAgent: 6 custom tools — retriever, calculator, EDGAR fetcher, sentiment scorer',
    {s:'RAG Pipeline'},
    'Load → Split → Embed → Store → Retrieve → Generate',
    '.as_retriever(search_type="mmr"): max marginal relevance for diverse results',
    {s:'LangGraph'},
    'Models agent as a directed graph: nodes = Python functions, edges = conditional transitions, shared state = TypedDict',
    'Supports: loops, branching, human-in-the-loop, checkpointing, multi-agent — now the recommended production approach',
  ]},

  {id:'n-mcp1',cat:'c-mcp',tag:'CONCEPT',title:'MCP — What It Is & Why It Exists',items:[
    {s:'The problem it solves'},
    {p:'Every AI app used to need custom code to connect an LLM to each tool — one integration for Gmail, another for GitHub, another for Slack. MCP (Model Context Protocol) standardises this: one protocol, any tool, any AI client.'},
    {p:'Think of it like USB-C. Before USB-C, every device had a different port. MCP is the universal connector between AI models and external services.'},
    {s:'What MCP enables'},
    'An LLM can call tools (read emails, create calendar events, query a database) through a standardised interface — without custom glue code for each service.',
    'The same MCP server works with any MCP-compatible client: Claude, Cursor, VS Code Copilot, your own app.',
    {s:'The three primitives'},
    'Tools — functions the LLM can call (e.g. "send_email", "create_task"). The LLM decides when to call them.',
    'Resources — data the LLM can read (e.g. file contents, database rows). Think of these as context, not actions.',
    'Prompts — pre-built prompt templates exposed by the server. The LLM or user can invoke them by name.',
    {s:'Architecture'},
    'MCP Host: the AI application (Claude.ai, Cursor, your app). Contains the MCP client.',
    'MCP Client: maintains a 1:1 connection to each MCP server it talks to.',
    'MCP Server: a small program that exposes tools/resources/prompts for one service (Gmail, GitHub, etc.).',
    {fig:`<svg viewBox="0 0 340 200" xmlns="http://www.w3.org/2000/svg" font-family="JetBrains Mono,monospace" font-size="9.5">
  <defs>
    <marker id="arr4" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
      <path d="M0,0 L6,3 L0,6 Z" fill="#38bdf8"/>
    </marker>
    <marker id="arr4b" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
      <path d="M0,0 L6,3 L0,6 Z" fill="#6a6a80"/>
    </marker>
  </defs>
  <!-- MCP Host -->
  <rect x="10" y="20" width="130" height="160" rx="4" fill="#0e1e2a" stroke="#38bdf8" stroke-opacity=".4"/>
  <text x="75" y="36" fill="#38bdf8" text-anchor="middle" font-size="8" letter-spacing="1">MCP HOST</text>
  <!-- LLM -->
  <rect x="24" y="44" width="102" height="30" rx="3" fill="#161828" stroke="#818cf8"/>
  <text x="75" y="63" fill="#818cf8" text-anchor="middle">LLM (Claude)</text>
  <!-- Client -->
  <rect x="24" y="88" width="102" height="30" rx="3" fill="#0e1e2a" stroke="#38bdf8" stroke-opacity=".7"/>
  <text x="75" y="105" fill="#38bdf8" text-anchor="middle">MCP Client</text>
  <text x="75" y="116" fill="#6a6a80" text-anchor="middle" font-size="8">1:1 per server</text>
  <!-- LLM → Client -->
  <line x1="75" y1="74" x2="75" y2="87" stroke="#6a6a80" stroke-width="1.5" marker-end="url(#arr4b)"/>
  <text x="88" y="84" fill="#6a6a80" font-size="7.5">tool_use</text>

  <!-- Arrows between host and servers -->
  <line x1="140" y1="90" x2="180" y2="70" stroke="#38bdf8" stroke-width="1.3" marker-end="url(#arr4)" opacity=".7"/>
  <line x1="140" y1="103" x2="180" y2="103" stroke="#38bdf8" stroke-width="1.3" marker-end="url(#arr4)" opacity=".7"/>
  <line x1="140" y1="116" x2="180" y2="136" stroke="#38bdf8" stroke-width="1.3" marker-end="url(#arr4)" opacity=".7"/>
  <text x="148" y="98" fill="#38bdf8" font-size="7.5">stdio /</text>
  <text x="148" y="107" fill="#38bdf8" font-size="7.5">HTTP+SSE</text>

  <!-- MCP Servers -->
  <rect x="182" y="44" width="110" height="36" rx="3" fill="#0e1e2a" stroke="#38bdf8" stroke-opacity=".6"/>
  <text x="237" y="60" fill="#38bdf8" text-anchor="middle">MCP Server</text>
  <text x="237" y="71" fill="#6a6a80" text-anchor="middle" font-size="8">Gmail · Drive</text>

  <rect x="182" y="86" width="110" height="36" rx="3" fill="#0e1e2a" stroke="#38bdf8" stroke-opacity=".6"/>
  <text x="237" y="102" fill="#38bdf8" text-anchor="middle">MCP Server</text>
  <text x="237" y="113" fill="#6a6a80" text-anchor="middle" font-size="8">GitHub · Slack</text>

  <rect x="182" y="128" width="110" height="36" rx="3" fill="#0e1e2a" stroke="#38bdf8" stroke-opacity=".6"/>
  <text x="237" y="144" fill="#38bdf8" text-anchor="middle">MCP Server</text>
  <text x="237" y="155" fill="#6a6a80" text-anchor="middle" font-size="8">Custom (stdio)</text>

  <!-- Primitives label -->
  <text x="237" y="186" fill="#6a6a80" text-anchor="middle" font-size="8">exposes: Tools · Resources · Prompts</text>
  <!-- Tool result back arrow -->
  <path d="M182,62 Q160,62 140,90" stroke="#6a6a80" stroke-width="1" fill="none" stroke-dasharray="2,2" opacity=".5"/>
  <text x="148" y="76" fill="#6a6a80" font-size="7.5">result</text>
</svg>`,cap:'MCP Architecture — Host / Client / Server'},
    {s:'Transport'},
    'stdio: MCP server runs as a local subprocess. Simple, no network needed. Most local servers use this.',
    'HTTP+SSE (or "URL" type): MCP server runs remotely, client connects over HTTPS. Used for cloud services like Gmail MCP.',
  ]},
  {id:'n-mcp2',cat:'c-mcp',tag:'TOOLS & RESOURCES',title:'MCP — Tools, Resources & Prompts',items:[
    {s:'Tools (model-controlled actions)'},
    {p:'Tools are functions the LLM decides to call based on the task. Each tool has a name, description, and JSON schema for its inputs. The LLM reads the description to know when and how to use it.'},
    'Example: a Gmail MCP server might expose tools: list_emails, read_email, send_email, search_emails.',
    'The LLM sees the tool descriptions, decides "I need to read the inbox", and calls list_emails — the client executes it and returns the result.',
    'This is exactly how Claude uses the Gmail and Google Calendar MCP servers in this app.',
    {s:'Resources (model-readable context)'},
    {p:'Resources are data sources the model can request — like files, database rows, or live API data. Unlike tools, resources don\'t execute actions; they just return content. Think of them as context injection on demand.'},
    'URI-based: each resource has a URI like gmail://inbox or file:///path/to/doc.txt.',
    'Can be static (a file) or dynamic (a live DB query result).',
    {s:'Prompts (reusable templates)'},
    'Pre-built message templates exposed by the server. A user or the model invokes them by name.',
    'Example: a GitHub MCP server might expose a "review_pr" prompt that structures the code review task automatically.',
    {s:'Tool call lifecycle (what actually happens)'},
    '1. LLM sees tool descriptions in its context. 2. LLM outputs a tool_use block with name + arguments.',
    '3. MCP client intercepts it, calls the MCP server. 4. Server executes and returns tool_result.',
    '5. Result is injected back into the conversation. 6. LLM continues with the new information.',
  ]},
  {id:'n-mcp3',cat:'c-mcp',tag:'PRODUCTION',title:'MCP — Building & Using Servers',items:[
    {s:'Server types you\'ll encounter'},
    'Local (stdio): runs on your machine, launched as a subprocess. Used for filesystem access, local code execution, shell commands.',
    'Remote (HTTP+SSE / URL): runs in the cloud, accessed over HTTPS. Used for SaaS APIs — Gmail, Slack, Asana, Salesforce.',
    'Official servers: Anthropic ships first-party MCP servers for Gmail, Google Calendar, Google Drive, GitHub, Slack, and more.',
    {s:'Building your own MCP server (Python)'},
    'Use the official mcp Python SDK. Decorate functions with @mcp.tool() — the SDK handles schema generation, transport, and protocol.',
    'Each tool function gets a description string — this is critical, it\'s what the LLM reads to decide when to use the tool.',
    'Run with: mcp.run(transport="stdio") for local or mcp.run(transport="sse") for remote.',
    {s:'Calling MCP from Claude API (agentic artifacts)'},
    'Pass mcp_servers=[{"type":"url","url":"https://gmail.mcp.claude.com/mcp","name":"gmail"}] in the API call.',
    'The LLM will automatically use the tools exposed by that server — no extra code needed.',
    'You can combine multiple MCP servers + web search tools in the same API call for complex workflows.',
    {s:'Security considerations'},
    'MCP servers run with whatever permissions the underlying process has — a filesystem MCP can delete files.',
    'Prompt injection risk: malicious data returned by a tool could trick the LLM into calling other tools.',
    'Best practice: scope each MCP server to minimum required permissions; validate tool inputs server-side.',
    {s:'When MCP is overkill'},
    'For simple one-off API calls, just write a Python function and call it. MCP is valuable when: (1) you want the LLM to dynamically decide when to call tools, (2) you want the same server to work across multiple AI clients, or (3) you\'re building a production agentic system.',
  ]},
  {id:'n-dsa1',cat:'c-dsa',tag:'LEETCODE',title:'DSA — Core Patterns',items:[
    {s:'Array / String'},
    'Two pointers · Sliding window · Prefix sum · Hashmap for frequency counting',
    'Binary search on sorted arrays AND on answer space (capacity, minimum days, etc.)',
    {s:'Trees'},
    'DFS recursive: pre/in/postorder · BFS queue: level-order, min depth, right-side view',
    {s:'Graphs'},
    'BFS: shortest unweighted path, connected components (use queue)',
    'DFS: cycle detection, topological sort, flood fill (use stack or recursion)',
    'Union-Find: efficient connected components · Dijkstra: weighted shortest path (BFS + min-heap)',
    {s:'Dynamic Programming'},
    '1D: house robber, coin change, climbing stairs · 2D: LCS, edit distance, unique paths',
    'Steps: (1) define state, (2) recurrence relation, (3) base cases, (4) fill order',
  ]},
];
const qaData = [
  {id:'q-ml1',cat:'c-ml',q:'What is the bias-variance tradeoff and how do you manage it?',
   a:['Bias = error from wrong assumptions (underfitting). Variance = sensitivity to training noise (overfitting).',
      'Total error = bias² + variance + irreducible noise — minimise the SUM, not each individually.',
      'Reduce bias: more model capacity, more features, less regularisation.',
      'Reduce variance: L1/L2/dropout, more data, ensemble methods, early stopping.',
      'Validation curve: plot train vs val error vs complexity — sweet spot = min val error.']},
  {id:'q-ml2',cat:'c-ml',q:'Explain L1 vs L2 regularisation — when would you choose each?',
   a:['L1 (Lasso): Σ|wᵢ| penalty → pushes weights to exactly zero → automatic feature selection.',
      'L2 (Ridge): Σwᵢ² penalty → shrinks uniformly but rarely zero → stable with correlated features.',
      'Use L1 when: many irrelevant features, you want a sparse interpretable model.',
      'Use L2 when: all features likely contribute, numerical stability is needed.',
      'Elastic Net = α·L1 + (1−α)·L2: best of both — good for high-dimensional data.']},
  {id:'q-ml3',cat:'c-ml',q:'Why does Adam outperform SGD? When would you still choose SGD?',
   a:['Adam maintains per-parameter adaptive learning rates using 1st moment (m) and 2nd moment (v) of gradients.',
      'High-gradient params get smaller effective LR; rarely-updated params get larger LR.',
      'Bias correction in early steps prevents m/v being dominated by zero initialisation.',
      'SGD + momentum can match Adam final accuracy on CNNs but requires more careful tuning.',
      'AdamW (Adam + decoupled weight decay) is the current default for transformer fine-tuning.']},
  {id:'q-dl1',cat:'c-dl',q:'Explain the attention mechanism — why do we scale by √d_k?',
   a:['Attention(Q,K,V) = softmax(Q·Kᵀ / √d_k) · V. Q="what I want", K="what I offer", V="what I give".',
      'Without scaling: dot products grow proportionally to d_k → softmax saturates → near-zero gradients.',
      'Dividing by √d_k normalises the dot product variance back to ~1 — keeps softmax in a sensitive region.',
      'Multi-head: run h attention computations in parallel with separate learned projections.',
      'Each head specialises in a different type of relationship (syntax, coreference, semantics).']},
  {id:'q-dl2',cat:'c-dl',q:'What is Flash Attention and why does it matter for LLMs?',
   a:['Standard attention writes the full n×n attention matrix to slow GPU memory (HBM) — O(n²) space.',
      'Flash Attention is an IO-aware CUDA kernel that computes attention in small tiles in fast on-chip memory (SRAM).',
      'It is mathematically identical to standard attention — not an approximation.',
      'Result: 2–4× speedup, 5–20× memory reduction, enabling much longer context windows.',
      'Flash Attention 2 further improves parallelism and is now the default in LLaMA, Mistral, and Falcon.']},
  {id:'q-dl3',cat:'c-dl',q:'What is the vanishing gradient problem? How do residuals solve it?',
   a:['Deep networks backpropagate gradients through every layer. They shrink exponentially — early layers receive near-zero gradients and stop learning.',
      'Sigmoid/tanh are the worst offenders: max derivative ≤ 0.25 → after 50 layers, gradient ≈ 0.',
      'Residual connection: output = x + F(x). Gradient ∂L/∂x = ∂L/∂output · (1 + ∂F/∂x).',
      'The "+1" guarantees a direct gradient path regardless of what F(x) does — training stays healthy at 100+ layers.',
      'Also helps: BatchNorm (normalises activations between layers) and ReLU (gradient = 1 for positive values).']},
  {id:'q-rag1',cat:'c-rag',q:'What is RAG? When would you use it vs fine-tuning?',
   a:['RAG retrieves relevant context from an external knowledge base at inference time and injects it into the prompt.',
      'Use RAG when knowledge is dynamic/frequently updated, needs citation, or is too large for the context window.',
      'Use fine-tuning when you need to change style, format, behaviour, or domain vocabulary — things RAG cannot fix.',
      'Use both: fine-tune for persona/style + RAG for factual grounding.',
      'Cost ladder: prompting → RAG → fine-tune → fine-tune+RAG. Always try the cheapest option first.']},
  {id:'q-rag2',cat:'c-rag',q:'Explain FAISS index types — when do you use each?',
   a:['IndexFlatL2: exact brute-force, 100% recall — use for <1M vectors or as a baseline. Your FinAgent uses this.',
      'IndexIVF: partitions space into Voronoi cells, searches only the nearest nprobe cells — fast, approximate.',
      'IndexHNSW: graph-based — very fast queries, high recall, but high memory usage.',
      'IndexIVF+PQ: combines IVF with product quantization for extreme compression — billions of vectors in RAM.',
      'Tuning IVF: nlist ≈ √n for cluster count; nprobe trades recall vs. latency.']},
  {id:'q-rag3',cat:'c-rag',q:'What is HyDE and why does it improve retrieval?',
   a:['HyDE = Hypothetical Document Embeddings. The core problem: a short query has a very different embedding from long answer documents.',
      'Solution: ask the LLM to write a hypothetical ideal answer → embed THAT → use it as the query vector.',
      'The hypothetical answer shares vocabulary and style with real documents, closing the embedding gap.',
      'Works best for short factual queries against long document corpora.',
      'Combine with multi-query: generate N hypothetical answers → retrieve for each → RRF merge.']},
  {id:'q-rag4',cat:'c-rag',q:'Explain RLHF vs DPO — why is DPO preferred now?',
   a:['RLHF: 3 stages — SFT → train Reward Model on preference pairs → PPO to maximise RM score.',
      'Problems: reward hacking (PPO finds unexpected ways to maximise RM), training instability, complex 3-stage pipeline.',
      'DPO (Direct Preference Optimization): reformulates RLHF as simple classification on (preferred, rejected) pairs. No RM needed.',
      'DPO loss: −log σ(β·[log π(y_w)/π_ref − log π(y_l)/π_ref])',
      'Advantages: single training stage, stable, competitive results, simple to implement. Used in Zephyr, many Llama-3 fine-tunes.']},
  {id:'q-rag5',cat:'c-rag',q:'"Lost in the middle" — what is it and how do you mitigate it?',
   a:['LLMs perform best when relevant information is at the START or END of the context window.',
      'Performance degrades significantly for content placed in the middle — even with 128K+ context models.',
      'Root cause: transformer attention patterns naturally favour the most recent and first tokens.',
      'Fix 1: rerank retrieved chunks and put the highest-relevance ones FIRST in the prompt.',
      'Fix 2: use fewer but higher-quality chunks (top-3 > top-20). Fix 3: verify relevance before injecting.']},
  {id:'q-kg1',cat:'c-kg',q:'How does multi-hop reasoning work in your ArXivMind KG?',
   a:['Multi-hop means answering questions that require traversing 2+ edges: knowing A→B and B→C to infer A→C.',
      'Your system: NetworkX graph (500+ nodes) + FAISS (300+ chunks) + Groq LLaMA for synthesis.',
      'Step 1: identify seed entities in the query, find their neighbours in the KG.',
      'Step 2: LLM decides which neighbouring relations are relevant to traverse next.',
      'Step 3: beam search keeps the top-k paths at each hop — prevents combinatorial explosion.',
      'Step 4: retrieve FAISS chunks for the identified nodes → LLM synthesises a cross-paper answer.']},
  {id:'q-ft1',cat:'c-ft',q:'Explain LoRA — how does it reduce trainable parameters?',
   a:['LoRA freezes the original weight matrix W and adds two smaller matrices: A ∈ R^(d×r) and B ∈ R^(r×k).',
      'Forward pass: h = xW + (α/r)·x·B·A. Only A and B are trained — W never changes.',
      'Trainable params: r·(d+k) vs d·k full. With r=8, d=k=4096: 65K vs 16M params — 250× smaller.',
      'B is initialised to zero so ΔW=0 at start — training begins from the original pre-trained model.',
      'At inference: merge ΔW = (α/r)·BA back into W → single matrix multiply, zero overhead.']},
  {id:'q-ft2',cat:'c-ft',q:'What is catastrophic forgetting and how do you prevent it?',
   a:['When you fully fine-tune on a narrow task, the model overwrites its general pre-training knowledge.',
      'Example: fine-tune GPT on medical QA → it forgets how to write coherent general-purpose text.',
      'Best fix: LoRA — the original weights are completely frozen, only the tiny A and B matrices change.',
      'Other fixes: mix general instruction data into the training set; use a very low LR with few epochs.',
      'Elastic Weight Consolidation (EWC): adds a penalty for changing weights that were important for old tasks.']},
  {id:'q-lc1',cat:'c-lc',q:'What is LCEL and how does it improve on older LangChain chains?',
   a:['LCEL = LangChain Expression Language. You write: chain = prompt | llm | parser — the pipe operator composes Runnables.',
      'Old approach (LLMChain, SequentialChain): verbose, imperative, hard to stream or customise.',
      'LCEL: lazy evaluation, async/streaming built-in out of the box, any component trivially swappable.',
      'RunnableParallel: runs multiple chains simultaneously and merges their outputs into a dict.',
      'LangSmith tracing integrates automatically — every call is logged for debugging.']},
  {id:'q-lc2',cat:'c-lc',q:'When would you use LangGraph instead of AgentExecutor?',
   a:['AgentExecutor is fine for simple linear ReAct loops with no branching or state persistence.',
      'Use LangGraph when you need: (1) cyclical flows, (2) conditional branching, (3) human-in-the-loop approval steps.',
      '(4) Checkpointing — save and restore agent state mid-run for long tasks. (5) Multi-agent coordination.',
      'LangGraph gives you full control: you define every node and edge — no hidden execution logic.',
      'LangChain now recommends LangGraph over AgentExecutor for all production agents.']},
  {id:'q-sys1',cat:'c-sys',q:'Design a real-time fraud detection system at 10K TPS.',
   a:['Features: transaction amount, merchant category, user velocity (1/5/30 min windows), geo distance from last txn.',
      'Feature store: Kafka streaming → Redis online store (<5ms reads); S3 Parquet offline for training.',
      'Model: LightGBM on tabular features + user/merchant embeddings for purchase history.',
      'Serving: REST API, P95 <30ms; rule-based fallback if model is unavailable.',
      'Monitoring: PSI on feature distributions; daily AUC on labeled samples; weekly retrain on dispute feedback.']},
  {id:'q-sys2',cat:'c-sys',q:'Data drift vs concept drift — how do you detect each?',
   a:['Data drift: the statistical distribution of INPUT features changes (e.g. new user demographics, seasonal patterns).',
      'Concept drift: the relationship between features and LABELS changes (e.g. fraud tactics evolve).',
      'Detect data drift: Population Stability Index (PSI >0.2 = significant); KS test per feature.',
      'Detect concept drift: monitor model performance on labeled holdout data with a sliding window AUC.',
      'Data drift does NOT always hurt — only if inputs shift into out-of-distribution regions. Concept drift always hurts.']},
  {id:'q-inf1',cat:'c-inf',q:'What are the DeepSpeed ZeRO stages? When do you use each?',
   a:['ZeRO (Zero Redundancy Optimizer): partition training state across GPUs to eliminate memory redundancy.',
      'Stage 1: partition optimizer states — minimal code change, ~4× memory reduction.',
      'Stage 2: + partition gradients — ~8× reduction, most common large-model training setting.',
      'Stage 3: + partition model parameters — enables trillion-parameter models.',
      'ZeRO-Offload: move optimizer/gradient state to CPU RAM — trades GPU memory for PCIe bandwidth.',
      'Rule: start with ZeRO-2 → OOM → ZeRO-3 → OOM → add Offload.']},
  {id:'q-inf2',cat:'c-inf',q:'Explain quantization — PTQ vs QAT, when to use each.',
   a:['Quantization: map FP32 weights to INT8/INT4 via scale factor — 4× memory, 2–4× speedup.',
      'PTQ (Post-Training Quantization): apply after training — fast, small accuracy loss.',
      'QAT (Quantization-Aware Training): simulate quantization during training → model adapts → lower accuracy loss.',
      'FP16/BF16: nearly lossless — standard for LLM serving. GPTQ/AWQ: INT4 weight-only for LLMs.',
      'Rule: try FP16 first; INT8 if memory/latency is critical; INT4 only if you need to run a large LLM on consumer GPU.']},
  {id:'q-dsa1',cat:'c-dsa',q:'BFS vs DFS — tradeoffs and when to use each?',
   a:['BFS uses a queue, explores level by level — guarantees shortest path in unweighted graphs. O(V+E) time and space.',
      'DFS uses a stack/recursion, goes depth-first — for topological sort, cycle detection, backtracking.',
      'Use BFS: shortest unweighted path, level-order tree traversal, "nearest node" problems.',
      'Use DFS: topological sort (DAGs), cycle detection, connected components, flood fill.',
      'BFS can be memory-heavy if the graph is very wide. DFS only stores the current path (O(depth)).']},
  {id:'q-dsa2',cat:'c-dsa',q:'Explain dynamic programming — top-down vs bottom-up.',
   a:['DP breaks a problem into overlapping subproblems and caches results to avoid recomputation.',
      'Requires: optimal substructure (optimal solution uses optimal subproblems) + overlapping subproblems.',
      'Top-down (memoization): recursive with a cache — natural to write, only computes needed states.',
      'Bottom-up (tabulation): fill a table iteratively from base cases — no recursion overhead, better for large n.',
      'Steps: (1) define state clearly, (2) write recurrence relation, (3) identify base cases, (4) determine fill order.',
      'Coin Change: dp[i] = min coins to make amount i; dp[i] = min(dp[i - coin] + 1) for each coin.']},
];
const archData = [
  {id:'a1',group:'transformer',title:'Transformer Encoder Block',
   front:'Walk me through the full Transformer encoder block, step by step from input to output.',
   back:[
    '1. INPUT EMBEDDING: token IDs → embedding lookup (each token becomes a dense vector)',
    '2. POSITIONAL ENCODING: add a vector encoding the token\'s position in the sequence (since attention has no inherent order)',
    '3. MULTI-HEAD SELF-ATTENTION: LayerNorm(x) → Q,K,V projections → scaled dot-product attention per head → concat all heads → W_O projection',
    '4. RESIDUAL 1: x = x + Attention_output  (skip connection — preserves gradient flow)',
    '5. FEED-FORWARD NETWORK: LayerNorm(x) → Linear(d_model → 4·d_model) → GELU/ReLU → Linear(4·d_model → d_model)',
    '6. RESIDUAL 2: x = x + FFN_output',
    '7. Repeat this entire block N times (e.g. 12 layers for BERT-base, 32 for LLaMA-7B)',
    '8. Final output: LayerNorm → task head (classifier softmax OR next-token LM head)',
    'Pre-norm (modern LLMs): LayerNorm is applied BEFORE each sublayer — more stable training than post-norm (original paper)',
   ]},
  {id:'a2',group:'transformer',title:'Multi-Head Attention — Matrix Dimensions',
   front:'Explain exactly what happens inside multi-head attention, with concrete matrix dimensions.',
   back:[
    'Input: X ∈ R^(seq × d_model), e.g. seq=512 tokens, d_model=768',
    'd_k = d_model / num_heads = 768/12 = 64  (each head works in 64-dimensional space)',
    'For each head h: Q_h = X·W_Q^h,  K_h = X·W_K^h,  V_h = X·W_V^h  where each W ∈ R^(768×64)',
    'Attention_h = softmax(Q_h·K_hᵀ / √64) · V_h  → output shape: (512 × 64)',
    'Concat all 12 heads: [A_1; A_2; ...; A_12] → shape (512 × 768)',
    'Final projection: Concat · W_O where W_O ∈ R^(768×768) → shape (512 × 768)',
    'Total params in one MHA: 4 × (768×768) = ~2.4M for BERT-base',
    'Why multiple heads? Each head learns different relationships (e.g. head 1=syntax, head 2=coreference, head 3=proximity)',
   ]},
  {id:'a3',group:'transformer',title:'BERT vs GPT Decoder Structure',
   front:'How does the GPT decoder differ structurally from BERT? What is a causal mask?',
   back:[
    'BERT encoder: every token attends to ALL other tokens bidirectionally — full attention matrix is used',
    'GPT decoder: token at position i can ONLY attend to positions ≤ i (cannot see future tokens)',
    'How causal masking works: set upper-triangle of attention score matrix to −∞ BEFORE softmax → those positions get zero weight',
    'Why this matters: GPT is trained to predict the NEXT token — it cannot cheat by peeking ahead',
    'BERT pretraining: mask 15% of tokens randomly, train to predict the masked tokens (MLM)',
    'T5: has BOTH an encoder (bidirectional, reads the input fully) AND a decoder (causal, generates output)',
    'Cross-attention in T5 decoder: Q comes from decoder state, K and V come from encoder output — lets decoder condition on the full input',
   ]},
  {id:'a4',group:'transformer',title:'LoRA Architecture',
   front:'Draw the LoRA modification. How does it work at train time vs inference time?',
   back:[
    'ORIGINAL LAYER (frozen): h = x · W  where W ∈ R^(d×k), completely frozen during fine-tuning',
    'LORA ADDS (trainable): h = x·W  +  (α/r) · x·B·A  where A ∈ R^(d×r), B ∈ R^(r×k)',
    'r is the "rank" — controls how much capacity LoRA has. Typical values: 4, 8, 16, 64',
    'Initialisation: A is random Gaussian, B is all zeros → ΔW = B·A = 0 at start (training starts from base model)',
    'Only A and B receive gradients. W is frozen — no chance of catastrophic forgetting',
    'TRAINING SIZE: with r=8, d=k=4096: 2×(4096×8)=65K params vs 4096×4096=16M → 250× fewer trainable params',
    'INFERENCE OPTION A: keep W and LoRA separate → two matmuls (tiny overhead)',
    'INFERENCE OPTION B: merge ΔW=(α/r)·B·A into W → W_new is a single merged matrix → zero overhead',
    'Target layers: usually q_proj and v_proj in attention. Add k_proj, o_proj, FFN for more expressivity',
   ]},
  {id:'a5',group:'rag',title:'Full RAG Pipeline',
   front:'Draw the complete RAG pipeline from document ingestion to final answer.',
   back:[
    '--- OFFLINE INDEXING ---',
    '1. LOAD: PDF/HTML/DB documents → extract raw text (PyPDFLoader, WebBaseLoader, etc.)',
    '2. SPLIT: RecursiveCharacterTextSplitter, chunk_size=512, overlap=64 → list of text chunks',
    '3. EMBED: bi-encoder model (BGE-M3 / text-embedding-3) → dense vector per chunk',
    '4. STORE: FAISS / Pinecone / Qdrant index + original text in parallel',
    '--- ONLINE RETRIEVAL (at query time) ---',
    '5. QUERY EMBED: same bi-encoder encodes user query → query vector',
    '6. ANN SEARCH: FAISS returns top-50 candidate chunks by cosine similarity',
    '7. RERANK (optional): cross-encoder scores each (query, chunk) pair → return top-5',
    '--- GENERATION ---',
    '8. ASSEMBLE PROMPT: system message + retrieved chunks + user query',
    '9. LLM generates answer grounded in the injected context',
    '10. EVALUATE (optional): RAGAS faithfulness + answer relevance + context recall',
   ]},
  {id:'a6',group:'rag',title:'Agentic RAG — FinAgent',
   front:'How does agentic RAG differ from naive RAG? Draw the FinAgent architecture.',
   back:[
    'NAIVE RAG: query → retrieve → generate. Single step. No reasoning about which tool to use.',
    'AGENTIC RAG: LLM is the orchestrator. It decides WHICH tool to call and WHEN, based on its own reasoning.',
    '--- FinAgent Architecture ---',
    'User query → AgentExecutor → ReAct loop (Thought → Action → Observation → repeat)',
    'TOOL 1 — SEC_Retriever: FAISS IndexFlatL2 over 300+ EDGAR 10-K/10-Q chunks',
    'TOOL 2 — Metric_Calculator: extract numbers from text → compute financial ratios',
    'TOOL 3 — EDGAR_Fetcher: pull raw filing text for a given ticker and date',
    'TOOL 4 — Sentiment_Scorer: NLP sentiment on management discussion section',
    'TOOL 5 — Timeline_Builder: construct chronological financial event timeline',
    'TOOL 6 — Cross_Company_Comparator: compare a metric across multiple tickers',
    'LLM: LLaMA-3.1-8B via Groq (fast inference). Loop terminates on "Final Answer:" token.',
    'Why agentic? Multi-hop: to answer "is AAPL more leveraged than MSFT?" you need to fetch → compute → compare — single retrieval cannot do this.',
   ]},
  {id:'a7',group:'rag',title:'Hybrid Search & RRF',
   front:'Explain hybrid search — how do you combine dense and sparse retrieval?',
   back:[
    '--- DENSE RETRIEVAL (semantic) ---',
    'Bi-encoder: embed both query and document independently → cosine similarity',
    'Handles: semantic matches, paraphrasing, conceptual queries',
    'Index: FAISS, Pinecone, Qdrant',
    '--- SPARSE RETRIEVAL (lexical) ---',
    'BM25 / TF-IDF: exact keyword matching with IDF weighting (penalises common words)',
    'Handles: exact product names, IDs, rare technical terms, precise phrases',
    'Index: Elasticsearch, OpenSearch, BM25Retriever in LangChain',
    '--- FUSION with RRF ---',
    'Run both retrievers in parallel → each returns a ranked list',
    'RRF score for document d: score(d) = Σ 1/(k + rank_i(d)) where k=60 (standard)',
    'Documents ranked highly in both lists score highest — no learned weights needed',
    'Your ArXivMind: structured KG traversal + semantic FAISS is the same hybrid idea',
   ]},
  {id:'a8',group:'training',title:'RLHF Pipeline',
   front:'Draw the full RLHF pipeline — what are the 3 models and what order are they trained?',
   back:[
    '--- STAGE 1: SFT (Supervised Fine-Tuning) ---',
    'Start with a base LLM. Fine-tune it on (instruction, good response) demonstration pairs.',
    'Result: SFT model — follows instructions reliably but not yet aligned with human preferences.',
    '--- STAGE 2: Reward Model ---',
    'Collect human preference labels: given prompt P, humans rank response A > response B.',
    'Fine-tune a separate model (usually the SFT model + regression head) to predict the preferred response.',
    'Input: (prompt, response) → Output: scalar reward score.',
    '--- STAGE 3: RL with PPO ---',
    'The SFT model (now the "policy") generates responses to prompts.',
    'Each response is scored by the Reward Model.',
    'PPO update: nudge policy weights to increase expected reward.',
    'KL penalty: prevents the policy from drifting too far from the SFT model (avoids reward hacking).',
    '--- DPO ALTERNATIVE ---',
    'Skips RM entirely. Directly computes a loss from (preferred, rejected) pairs using a closed-form objective.',
    'Simpler, stable, widely adopted (Zephyr, Llama fine-tunes). TRL has a ready DPOTrainer.',
   ]},
  {id:'a9',group:'training',title:'QLoRA — 3 Key Innovations',
   front:'What are the 3 technical innovations in QLoRA that let you fine-tune a 70B model on 1 GPU?',
   back:[
    '--- INNOVATION 1: 4-bit NF4 Quantization ---',
    'The base model weights are compressed from FP32 (4 bytes/param) to NF4 format (~0.5 bytes/param).',
    'NF4 = Normal Float 4: a quantization grid designed to match the bell-curve distribution of trained neural network weights → minimal quality loss.',
    'Effect: a 70B model shrinks from ~140GB (FP32) to ~35GB — fits on one 48GB GPU.',
    '--- INNOVATION 2: Double Quantization ---',
    'The quantization scale factors themselves (one per small block of weights) are also quantized (FP32→FP8).',
    'Saves ~0.5 bits per parameter — small per-weight but adds up at 70B scale (~4GB saved).',
    '--- INNOVATION 3: Paged Optimizers ---',
    'NVIDIA unified memory: optimizer states (Adam momentum/variance) automatically page to CPU RAM when GPU memory is full.',
    'Prevents out-of-memory crashes during forward/backward passes on long sequences.',
    '--- LoRA on top ---',
    'Only the tiny A and B matrices (in FP16) are updated. The frozen NF4 base never changes.',
    'Final result: fine-tune a 70B model on a single A100-48GB — previously required 8× A100-80GB.',
   ]},
  {id:'a10',group:'serving',title:'Production LLM Serving (vLLM)',
   front:'What are the key innovations in a production LLM serving system like vLLM?',
   back:[
    '--- CORE CHALLENGE ---',
    'LLM decoding is sequential (one token at a time). Serving many users naively means most of the GPU sits idle.',
    'Pre-allocating KV cache for maximum sequence length wastes memory for shorter sequences.',
    '--- PAGEDATTENTION ---',
    'Inspired by OS virtual memory: KV cache is divided into fixed-size "pages".',
    'Pages are allocated on demand and can be non-contiguous in memory — no wasted pre-allocation.',
    'Enables 2–4× more concurrent requests than naive serving.',
    '--- CONTINUOUS BATCHING ---',
    'Old approach: wait for all requests in a batch to finish before processing new ones.',
    'Continuous batching: as soon as one sequence in a batch finishes, insert a new request into that slot.',
    'GPU stays near 100% utilisation — critical for cost efficiency at scale.',
    '--- OTHER OPTIMIZATIONS ---',
    'Flash Attention 2: faster attention per token during generation.',
    'Speculative decoding: small draft model generates k tokens → large model verifies in parallel → 2–3× faster.',
    'Tensor parallelism: split model weight matrices across multiple GPUs for very large models.',
   ]},
  {id:'a11',group:'serving',title:'ONNX + TensorRT Optimization (Open Weaver)',
   front:'Walk through how you optimized LLM inference at Open Weaver with ONNX + TensorRT.',
   back:[
    '--- STEP 1: ONNX EXPORT ---',
    'torch.onnx.export(model, dummy_input, "model.onnx", opset_version=17)',
    'Converts the PyTorch model to a static computation graph — removes Python overhead, enables cross-framework optimisation.',
    'Validate: onnx.checker.check_model() + compare ONNX vs PyTorch outputs on test batch.',
    '--- STEP 2: TensorRT ENGINE BUILD ---',
    'TRT parses the ONNX graph and compiles a GPU-specific engine:',
    'Layer fusion: merges adjacent ops (e.g. Conv+BN+ReLU → single kernel → fewer kernel launches).',
    'Kernel autotuning: TRT benchmarks multiple CUDA implementations for each op and picks the fastest for your GPU.',
    '--- STEP 3: PRECISION ---',
    'FP16: nearly lossless, ~2× speedup — applied first (safe default).',
    'INT8: needs a calibration dataset to compute per-tensor scale factors. Greater speedup, needs careful validation.',
    '--- RESULT ---',
    '24% end-to-end latency reduction at Open Weaver.',
    'Engine serialised to .trt file — loaded at startup, no build cost at runtime.',
   ]},
];
const projectsData = [
  {id:'p1',cat:'c-rag',tag:'PORTFOLIO',color:'#fb923c',
   title:'FinAgent — Agentic RAG for SEC Filings',
   sub:'LangChain · FAISS · LLaMA-3.1-8B · Groq · 6 tools',
   sections:[
    {label:'The Problem',
     text:'Manually reading SEC 10-K/10-Q filings takes hours per company, and comparing multiple competitors is practically impossible at scale. I needed a system that could extract structured financial signals and reason across multiple tickers automatically.'},
    {label:'What I Built',
     text:'A 6-tool agentic RAG system where LLaMA-3.1-8B acts as an orchestrator, deciding which tool to call at each step. The tools cover SEC document retrieval (FAISS IndexFlatL2 over 300+ EDGAR chunks from 7 tickers), ratio calculation, raw filing fetching, NLP sentiment scoring on management discussion text, timeline construction, and cross-company comparison. The agent runs a ReAct loop — Thought → Action (tool call) → Observation — until it can produce a final answer.'},
    {label:'Key Decisions',
     text:'I chose LLaMA over GPT-4 for cost and because the data stays inside the local FAISS index. Agentic over naive RAG was necessary because answering "is Apple more leveraged than Microsoft?" requires fetching both filings, computing ratios, and then comparing — that is a multi-hop workflow a single retrieval step cannot handle. IndexFlatL2 was the right FAISS choice because 300 chunks is well within the exact search range.'},
    {label:'Results',
     text:'99% reduction in per-company analysis time. Can compare 7 tickers in a single query that would have taken a full day manually.'},
   ],
   chips:['LangChain','FAISS','LLaMA-3.1-8B','Groq','EDGAR API','ReAct','Agentic AI'],
   qa:[
    {q:'How does the ReAct loop work and why is it better than a single retrieval pass for financial analysis?',
     a:'ReAct interleaves Reasoning and Acting: the LLM produces a Thought (what it needs to do), then an Action (which tool to call with what arguments), then receives an Observation (the tool result), and repeats until it has enough information to give a Final Answer. For financial analysis this is necessary because a question like "compare Apple and Microsoft gross margins over 3 years" requires: fetch filing A → extract margin → fetch filing B → extract margin → compute delta → compare. A single retrieval only answers "what does this chunk say" — it cannot chain computations across multiple documents.'},
    {q:'You used FAISS IndexFlatL2 — when would you switch to IndexIVF or HNSW and why?',
     a:'IndexFlatL2 does exact brute-force search over all vectors and is correct at any scale, but it is O(n) per query. At 300 chunks this is instant. I would switch to IndexIVF once the corpus exceeds ~1 million vectors: IVF clusters vectors into Voronoi cells and only searches the nearest nprobe clusters, giving sub-linear query time at the cost of some recall. I would choose HNSW if I needed very fast low-latency queries with high recall and could afford higher memory — it builds a navigable small-world graph. For production EDGAR pipelines scaling to all S&P 500 filings I would move to IVF+PQ to compress vectors and fit billions of chunks in RAM.'},
    {q:'How did you handle chunking SEC filings — what are the tradeoffs of different chunking strategies?',
     a:'SEC filings have semi-structured sections (Risk Factors, MD&A, Financial Statements) so I used section-aware chunking: split on detected headers first, then apply a 512-token recursive text splitter with 64-token overlap within each section. The overlap prevents answers from being split across two chunks. Fixed-size chunking is simpler but loses section context. Semantic chunking (clustering similar sentences) is highest quality but expensive. The parent-child strategy — retrieve small chunks but return the larger parent section — often works best for long documents because it improves both precision (small chunk for matching) and recall (large context for answering).'},
    {q:'LangChain agent vs writing a custom loop — when would you drop LangChain?',
     a:'LangChain AgentExecutor is convenient for prototyping but in production it has hidden retry logic, output parsing that can break on unusual LLM responses, and limited observability into what is actually happening. I would drop it in three situations: (1) I need guaranteed deterministic tool call ordering, (2) I need checkpointing to resume mid-run (I would use LangGraph instead), or (3) I need to handle failures gracefully with custom fallback logic. For FinAgent the AgentExecutor was fine because the task is stateless and the number of steps is bounded, but for a production agentic system I would migrate to LangGraph where every node and transition is explicit and auditable.'},
    {q:'Your sentiment scores were backtested against 30-day returns. What did you check for to avoid data leakage?',
     a:'The key leakage risk in this setup is using filing data that was not yet public at the time the return window starts. I used the SEC filing date (not the fiscal period end date) as the event timestamp and measured returns from the next market open after that date — this ensures the model is only using information that was publicly available. I also checked for look-ahead bias in feature computation: any rolling aggregates (e.g. average sentiment over the last 4 quarters) were computed only using filings dated before the measurement point.'},
   ],
   gh:'https://github.com/arul10sathya/finagent'},
  {id:'p2',cat:'c-dl',tag:'SENIOR DESIGN',color:'#818cf8',
   title:'BeatNet — ECG Arrhythmia Classification',
   sub:'1D U-Net · ECG Foundation Model · 90M params · 0.976 micro-AUROC',
   sections:[
    {label:'The Problem',
     text:'Aventusoft needed a production-ready AI that could classify arrhythmias from a single-lead ECG wearable. The challenge had two distinct stages: first, precisely locating PQRST waveform components in the raw signal; second, classifying the beat into one of 17 arrhythmia categories — with the whole pipeline running edge-compatibly.'},
    {label:'What I Built',
     text:'A two-stage pipeline. Stage 1 is a 1D U-Net that segments the raw ECG signal into PQRST components — the encoder-decoder structure with skip connections is perfect for this because it captures both high-level rhythm patterns and fine-grained waveform morphology. Stage 2 fine-tunes a 90M-parameter ECG Foundation Model (pretrained on a large cardiac dataset) for 17-class arrhythmia classification. Signal preprocessing includes bandpass filtering at 0.5–40 Hz, R-peak detection, and beat segmentation.'},
    {label:'Key Decisions',
     text:'A foundation model was the right call because labeled arrhythmia data is scarce — starting from a model that already understands ECG signals is dramatically more data-efficient than training from scratch. 1D instead of 2D because ECG is a time-series signal, not an image.'},
    {label:'Results',
     text:'0.976 micro-AUROC across all 17 classes. Delivered a production-ready Python package to Aventusoft for integration into their wearable cardiac monitoring system.'},
   ],
   chips:['PyTorch','1D U-Net','ECG Foundation Model','Signal Processing','HuggingFace','IPPD'],
   qa:[
    {q:'Why a U-Net specifically for delineation — why not a simpler 1D CNN or an LSTM?',
     a:'The U-Net encoder-decoder with skip connections is designed for segmentation tasks where you need to predict a label for every input timestep, not just a single output. A plain CNN produces a downsampled feature map — you lose temporal resolution. An LSTM captures sequence context but degrades on long ECG signals because BPTT gradients vanish over long sequences. The U-Net encoder compresses the signal to extract hierarchical features (rhythm, morphology), then the decoder upsamples back to the original resolution, and skip connections paste encoder feature maps directly into the decoder at each scale — this preserves fine-grained waveform detail like P-wave onset that the bottleneck would otherwise lose.'},
    {q:'How does fine-tuning a foundation model differ from training from scratch for this task?',
     a:'Training from scratch on arrhythmia data alone would fail because labeled arrhythmia datasets are small (thousands of beats vs millions needed for good generalisation). The ECG Foundation Model was pretrained on millions of ECG recordings in a self-supervised manner, learning universal cardiac signal representations — morphology, rhythm patterns, noise characteristics. Fine-tuning on my 17-class dataset adapts these representations to the specific classification task. I froze the early encoder layers (which learned general signal features) and fine-tuned the later layers and classification head. This is the same principle as using ImageNet-pretrained ResNet for medical imaging: you get good generalisation with far less labeled data.'},
    {q:'What is micro-AUROC and why is it the right metric for 17-class arrhythmia classification?',
     a:'AUROC measures how well a model separates positives from negatives across all classification thresholds — it is threshold-independent and robust to class imbalance. Micro-AUROC specifically pools all true positives and false positives across every class before computing the curve, effectively weighting each individual prediction equally regardless of class size. This is the right choice here because arrhythmia datasets are highly imbalanced — normal beats are far more common than rare arrhythmias. Macro-AUROC would treat a rare class with 50 samples the same as a common class with 5000, which misrepresents model performance. At 0.976 micro-AUROC across 17 classes this is a strong result, above the typical clinical benchmark threshold of 0.95.'},
    {q:'Walk me through the signal preprocessing pipeline you built.',
     a:'Raw single-lead ECG comes in as a 1D voltage-time signal sampled at typically 250–500 Hz. Step 1: bandpass filter at 0.5–40 Hz to remove baseline wander (low frequency) and muscle noise (high frequency) while preserving the QRS complex and P/T waves. Step 2: R-peak detection using the Pan-Tompkins algorithm — find the dominant peaks in the QRS complex, which are the most prominent features in any ECG. Step 3: beat segmentation — extract a fixed-length window of 250ms before and 400ms after each R-peak to capture the full PQRST complex. Step 4: normalise each beat independently to zero mean and unit variance. The early preprocessing bug I caught was that my bandpass filter cutoffs were initialised incorrectly — I had 5–50 Hz instead of 0.5–40 Hz, which was clipping low-frequency P-waves and distorting the segments. Caught via residual analysis on segment overlays.'},
    {q:'How did you optimise inference for edge deployment?',
     a:'Three steps: first, I profiled the full pipeline on target hardware using PyTorch Profiler to identify bottlenecks — the U-Net delineation stage dominated latency. Second, I applied dynamic quantisation (INT8) to the U-Net using torch.quantization, which reduced memory by ~4x with less than 0.5% accuracy loss on our validation set. Third, I batched incoming beats into groups of 32 for the foundation model inference pass — the model runs much faster on a batch than on individual beats because GPU utilisation is low for single-sample inference. Together these brought per-beat inference time within Aventusoft\'s hardware budget.'},
   ],
   gh:''},
  {id:'p3',cat:'c-kg',tag:'PORTFOLIO',color:'#c084fc',
   title:'ArXivMind — Multi-Hop KG-RAG',
   sub:'NetworkX · FAISS · LangChain · 500+ node KG · 3D viz',
   sections:[
    {label:'The Problem',
     text:'Doing a literature review across 100+ arXiv papers means you need to understand not just individual papers but the relationships between them — who cites whom, which concepts are shared, how methods connect. A plain vector search cannot reason about these cross-paper relationships.'},
    {label:'What I Built',
     text:'A dual-retrieval agent with a 500+ node knowledge graph built in NetworkX (papers, authors, concepts, methods) and a FAISS vector store over 300+ semantic chunks from abstracts and sections. The LangChain agent uses Groq LLaMA-3.1-8B to decide, at each step, whether to traverse the KG (for structured relationships) or retrieve from FAISS (for semantic similarity). A beam search over the KG keeps the top-k paths at each hop to avoid combinatorial explosion. The system also has a 3D interactive visualisation of the KG.'},
    {label:'Key Decisions',
     text:'NetworkX over Neo4j because the graph is small enough (500 nodes) that a lightweight in-process solution avoids server complexity. The dual retrieval design is deliberate — KG answers "what methods does paper X share with paper Y?", while FAISS answers "what other papers are conceptually similar to this one?"'},
    {label:'Results',
     text:'95% reduction in multi-paper comparison tasks. The KG was built semi-automatically using GPT-4 entity and relation extraction from paper text.'},
   ],
   chips:['LangChain','FAISS','NetworkX','Groq','Neo4j','Plotly 3D'],
   qa:[
    {q:'What is multi-hop reasoning and why can FAISS alone not do it?',
     a:'Multi-hop reasoning means answering a question that requires chaining multiple facts together: "Which papers build on the contrastive learning method introduced by paper X?" requires first identifying paper X, then finding papers that cite it, then filtering those that specifically extend the contrastive learning method — three hops. FAISS retrieval finds semantically similar chunks but has no notion of graph structure or direction. It would return papers that mention contrastive learning but cannot distinguish between papers that cite paper X versus papers that happened to use the same term. The knowledge graph encodes explicit directional relations (EXTENDS, CITES, USES_METHOD) so the agent can traverse the correct path.'},
    {q:'How did you build the knowledge graph automatically from paper text?',
     a:'I used GPT-4 with a structured extraction prompt to read each paper abstract and introduction and output JSON triples: {head: "entity", relation: "RELATION_TYPE", tail: "entity"}. The prompt specified a fixed relation vocabulary (CITES, INTRODUCES, EXTENDS, USES_METHOD, AUTHORED_BY, PUBLISHED_IN) to keep the graph consistent. I then deduplicated entity names using fuzzy string matching (fuzzywuzzy) to merge variants like "BERT" and "BERT model" into the same node. Each node also stores metadata (paper title, year, arxiv ID) so the LLM can include it in answers. The main failure mode was hallucinated relations — GPT-4 occasionally invented plausible-sounding citations. I added a validation pass that checks whether claimed citation links actually exist in the paper reference list.'},
    {q:'Why NetworkX over Neo4j for this project?',
     a:'For a 500-node research graph, NetworkX is a clear win: it runs in-process in Python with zero setup, query latency is microseconds (graph is in RAM), and you get the full Python scientific ecosystem (numpy, matplotlib, scipy graph algorithms) for free. Neo4j adds significant operational complexity — you need a running server, connection management, and Cypher queries instead of Python method calls. I would switch to Neo4j when the graph exceeds the size that fits comfortably in RAM (typically >1M nodes), when I need concurrent multi-user write access, or when I need production-grade persistence and ACID guarantees. For ArXivMind as a research prototype, NetworkX was the right call.'},
    {q:'How does beam search prevent combinatorial explosion in multi-hop graph traversal?',
     a:'Naive multi-hop graph traversal is exponential: at each node you branch to all neighbours, and k hops with branching factor b gives b^k paths. For a 500-node graph with average degree 10, 3-hop traversal generates 10^3 = 1000 candidate paths per starting node. Beam search keeps only the top-B paths at each hop ranked by a scoring function (I used a combination of relation relevance to the query, node embedding similarity, and path length penalty). With beam width B=5, the search stays tractable at 5^3 = 125 paths maximum. The scoring function was the key design decision — I used cosine similarity between query embedding and node embedding computed by the same bi-encoder used for FAISS retrieval, so structural and semantic relevance were unified.'},
   ],
   gh:'https://github.com/arul10sathya/KG-RAG'},
  {id:'p4',cat:'c-dl',tag:'PORTFOLIO',color:'#4ade80',
   title:'THYRO-ViT — Thyroid Ultrasound Segmentation',
   sub:'ViT-UNet hybrid · SHAP explainability · 93% accuracy',
   sections:[
    {label:'The Problem',
     text:'Automating thyroid ultrasound segmentation for clinical use is not just a performance problem — it is a trust problem. A model that is 93% accurate but cannot explain what it is looking at is very hard for a clinician to trust. I needed both strong performance and interpretability.'},
    {label:'What I Built',
     text:'A ViT-UNet hybrid: a Vision Transformer encoder extracts patch-level features that capture global anatomical context across the full ultrasound image, while a UNet decoder with skip connections upsamples back to full resolution with fine-grained spatial detail the ViT alone cannot provide. DeepSHAP was applied on top to produce per-patch attribution maps that show which parts of the image drove each prediction.'},
    {label:'Key Decisions',
     text:'ViT over pure CNN because the ViT encoder\'s global attention can see the entire anatomical structure at once — important when the thyroid gland shape is a key diagnostic cue. The UNet decoder is kept because ViT embeddings are at patch resolution (low spatial detail); the decoder restores pixel-level precision via skip connections.'},
    {label:'Results',
     text:'93% segmentation accuracy. SHAP analysis surfaced three failure-mode edge cases where the model was over-relying on image compression artifacts rather than true tissue boundaries — these were flagged for the clinical review process.'},
   ],
   chips:['PyTorch','ViT','U-Net','SHAP','Medical Imaging','Segmentation'],
   qa:[
    {q:'Explain the Dice coefficient vs IoU — which did you optimise and why?',
     a:'Both measure overlap between predicted and ground truth masks. IoU = |A∩B| / |A∪B|. Dice = 2|A∩B| / (|A|+|B|). Mathematically, Dice = 2·IoU / (1+IoU), so they are monotonically related. In practice, Dice is more commonly used as the training loss for medical segmentation because it handles class imbalance better — when the structure of interest (thyroid gland) is small relative to the full image, IoU loss gradients become very sparse and training stalls. Dice loss treats the positive class more generously. I optimised Dice loss during training and reported both Dice and IoU at evaluation time since the clinical literature uses both.'},
    {q:'How does ViT handle images differently from a CNN — what is the inductive bias difference?',
     a:'CNNs have strong inductive biases baked in: translation equivariance (detecting a feature anywhere in the image) and locality (each filter only sees a small receptive field). These biases are great when the signal is local but limit the model when the relevant feature spans the full image. ViT has almost no inductive bias: it splits the image into 16×16 pixel patches, embeds each as a flat vector, and runs standard Transformer self-attention over all patches simultaneously. Every patch can attend to every other patch from layer one. For thyroid segmentation, this matters because the boundary of the thyroid is defined by its relationship to the surrounding tissue — a local convolution might miss that context. The downside: ViT needs much more data to learn good representations without those biases.'},
    {q:'What is DeepSHAP and why did you choose it over vanilla SHAP or GradCAM?',
     a:'SHAP (SHapley Additive exPlanations) assigns each input feature a credit value based on its marginal contribution to the prediction, grounded in cooperative game theory. DeepSHAP is an efficient implementation for deep networks that combines SHAP values with the DeepLIFT backpropagation algorithm — it propagates SHAP values layer by layer rather than sampling all feature subsets, making it tractable for large models. I chose it over GradCAM because GradCAM produces coarse class activation maps using the last convolutional layer gradients — it tells you which region activated, not how much each pixel contributed. DeepSHAP gives signed, per-pixel attributions so you can distinguish pixels that increased vs decreased the predicted segmentation probability. For clinical trust this matters: a doctor wants to know not just "the model looked here" but "this region increased its confidence in the thyroid boundary."'},
    {q:'The SHAP analysis found 3 edge cases relying on artifacts — what would you do about them?',
     a:'The three cases had high SHAP values concentrated on JPEG compression block boundaries and ultrasound-specific noise patterns rather than tissue boundaries. My immediate fix was to add those three cases to the training set with augmented noise patterns and retrain. For a more systematic solution I would: (1) add compression artifact augmentation during training (randomly apply JPEG compression at quality 40–80 to training images so the model learns to ignore those artifacts), (2) add a SHAP-based monitoring test to the CI pipeline that flags any new test case where >20% of the top SHAP mass falls outside the annotated region of interest, (3) work with the clinical team to curate a harder test set with known artifact-heavy images for ongoing evaluation.'},
   ],
   gh:'https://github.com/arul10sathya/THYRO-ViT'},
  {id:'p5',cat:'c-kg',tag:'PORTFOLIO',color:'#2dd4bf',
   title:'CourtIQ — NBA Analytics Platform',
   sub:'XGBoost · Neo4j · RAG fusion · shot chart analytics',
   sections:[
    {label:'What I Built',
     text:'An NBA analytics platform combining three layers: an XGBoost predictive model for player performance and game outcomes, a Neo4j knowledge graph with Player, Team, Game, and Season nodes connected by relationships like PLAYS_FOR, COACHED_BY, and TRADED_TO, and a multi-source RAG system fusing play-by-play text with box score stats. A GraphCypherQAChain converts natural language questions into Cypher queries and runs them against Neo4j, then an LLM synthesises the structured answer with retrieved text context.'},
    {label:'Key Decisions',
     text:'Neo4j was the right choice here because player trades, lineup changes, and coaching relationships are inherently graph-structured — querying "who coached LeBron when he averaged over 27 PPG?" is trivial in Cypher but painful in SQL. XGBoost over a neural network because the tabular stats dataset is limited in size and XGBoost gives interpretable feature importance for free.'},
   ],
   chips:['XGBoost','Neo4j','Cypher','LangChain','RAG','Plotly'],
   gh:''},
];
const experienceData = [
  {id:'e1',color:'#fb923c',tag:'INTERNSHIP',
   role:'Generative AI Intern',org:'Open Weaver',date:'Aug – Oct 2023',
   sections:[
    {label:'What I Did',
     text:'I built production RAG pipelines using FAISS and LangChain, improving query efficiency by 18% through better chunking strategies and switching to an IVF index. I fine-tuned GPT-3, T5, and BERT for a conversational AI product and an entity recognition use case.'},
    {label:'Inference Optimization',
     text:'The core technical challenge was getting the production chatbot under the latency SLA. I exported the model to ONNX, built a TensorRT engine with FP16 precision and layer fusion, and deployed it with DeepSpeed (ZeRO-2 for training + ZeRO-Inference for serving) on Kubernetes. The result was a 24% end-to-end latency reduction.'},
    {label:'Numbers to Know Cold',
     text:'24% latency reduction. 18% query efficiency improvement. Pipeline: PyTorch → ONNX export → TensorRT FP16 → K8s deployment. DeepSpeed ZeRO-2 for training memory, ZeRO-Inference for serving.'},
   ],
   chips:['FAISS','LangChain','GPT-3','T5','BERT','ONNX','TensorRT','DeepSpeed','FastAPI','Kubernetes']},
  {id:'e2',color:'#c084fc',tag:'INTERNSHIP',
   role:'Generative AI & Automation Intern',org:'Plumb5',date:'Jan – Apr 2023',
   sections:[
    {label:'What I Did',
     text:'I integrated LLM workflows — GPT-3, T5, and BART — into backend services to power AI-driven email personalisation at scale. I also built a drag-and-drop email template system in GrapeJS for non-technical marketing users and implemented data ingestion pipelines using Apache Kafka and SQL.'},
    {label:'Key Technical Choices',
     text:'Kafka was the right choice for the data pipeline because user behaviour events (page views, clicks, purchases) needed to stream in real time to update model features before the personalised email trigger fired. Polling-based alternatives introduced too much latency. BART was used for abstractive summarisation of user activity — its encoder-decoder architecture is purpose-built for that task.'},
    {label:'Numbers to Know',
     text:'Kafka handled 100K+ events per day reliably. The Kafka approach replaced a polling-based solution that had a multi-minute lag.'},
   ],
   chips:['GPT-3','T5','BART','LangChain','Apache Kafka','SQL','GrapeJS','FastAPI']},
  {id:'e3',color:'#4ade80',tag:'INTERNSHIP',
   role:'Machine Learning Intern',org:'L&T EduTech',date:'Jun – Jul 2022',
   sections:[
    {label:'What I Did',
     text:'I built predictive maintenance models using XGBoost and LSTMs for industrial equipment failure prediction and applied GNNs for anomaly detection in structured operational sensor data. I deployed the inference services on AWS SageMaker with auto-scaling endpoints.'},
    {label:'Key Choices',
     text:'XGBoost for the tabular sensor data because it consistently outperforms neural networks on limited labeled datasets and provides interpretable feature importance out of the box. LSTMs for the temporal degradation trends because equipment sensor readings are time-series — the LSTM captures the sequential pattern of wear over hours and days. SageMaker for deployment because of the built-in model registry, versioning, and auto-scaling policies.'},
   ],
   chips:['XGBoost','LSTM','GNN','AWS SageMaker','Python','Scikit-learn']},
  {id:'e4',color:'#f0c040',tag:'EDUCATION',
   role:'MS — Artificial Intelligence Systems',org:'University of Florida',date:'Aug 2024 – May 2026',
   sections:[
    {label:'Overview',
     text:'GPA 3.55/4.0. Based in Gainesville, FL. Affiliated with the Trustworthy Engineered Autonomy Lab, where the research focus is on visual hallucination detection in generative models.'},
    {label:'Current Research — EviDet v2',
     text:'EviDet v2 is a black-box unified hallucination detection framework using Dirichlet-based Evidential Deep Learning. The core idea is to model the model\'s output distribution as a Dirichlet distribution over class probabilities — the concentration parameters encode uncertainty. High uncertainty in the output signals likely hallucination. It is black-box (only input/output pairs needed, no access to model internals) and unified (same framework for both image-to-text captioning and text-to-image generation).'},
   ],
   chips:['Visual Hallucination','Evidential Deep Learning','Dirichlet Distributions','UF Research']},
  {id:'e5',color:'#34d399',tag:'EDUCATION',
   role:'BTech — AI & Machine Learning',org:'Rajalakshmi Engineering College (Anna University)',date:'Aug 2020 – May 2024',
   sections:[
    {label:'Overview',
     text:'GPA 3.7/4.0. Three-time hackathon winner, including a Real-Time Sign Language Interpreter project using MediaPipe and a custom gesture classifier. Presented research on "Facial Recognition for Autism Spectrum Disorder Diagnosis" at PEC ICONIC 2K23 — a ViT-based system for extracting facial features relevant to ASD diagnostic markers.'},
   ],
   chips:['Computer Vision','Deep Learning','Research Presentation','Hackathons']},
];
const behavioralData = [
  {id:'b1',type:'story',cat:'c-beh',
   title:'BeatNet — Most Technically Complex Project',
   q:'Walk me through your most technically challenging project.',
   star:{S:'Aventusoft / UF IPPD — needed production ECG AI for wearable arrhythmia detection',T:'End-to-end 17-class pipeline, edge-compatible, deliverable package to a real client',A:'1D U-Net (PQRST delineation) + fine-tuned 90M ECG Foundation Model + full preprocessing + edge optimisation',R:'0.976 micro-AUROC, production package delivered to Aventusoft'},
   prose:'Lead with the problem, not the tech stack. Say: "Aventusoft needed a cardiac AI that could run on a wearable — so I built a two-stage pipeline." Quantify early: 0.976 micro-AUROC, 17 classes, 90M parameters. The QRB2 memo is worth mentioning — it shows you can communicate technical decisions to non-technical stakeholders. Have the failure ready: preprocessing bandpass filter cutoffs were wrong early on, caught via residual analysis before the IPPD demo.'},
  {id:'b2',type:'story',cat:'c-beh',
   title:'FinAgent — Technical Architecture Decisions',
   q:'Describe a project where you made significant technical architecture decisions.',
   star:{S:'Manual SEC filing analysis takes hours per company and cannot scale to competitive intelligence',T:'Multi-company financial intelligence system with quantitative signal extraction',A:'6-tool agentic RAG, FAISS over 300+ EDGAR chunks, LLaMA-3.1-8B, backtested sentiment vs returns',R:'99% reduction in analysis time, 7-ticker comparison in one query'},
   prose:'Lead with WHY agentic: "answering cross-company questions requires multi-hop reasoning — fetch, compute, then compare — which single retrieval cannot do." Explain the LLaMA choice: cost and data privacy (nothing leaves the local index). The 99% figure is compelling — always lead with it. For "what would you do differently?" say: add a RAGAS evaluation loop and a cross-encoder reranker.'},
  {id:'b3',type:'story',cat:'c-beh',
   title:'Technical Failure — What I Learned',
   q:'Tell me about a time something went wrong technically and how you handled it.',
   star:{S:'BeatNet early development — beat segmentation was producing noisy, misaligned waveform segments',T:'Debug root cause before IPPD milestone delivery',A:'Systematic residual analysis on segment boundaries → found bandpass filter cutoffs were misconfigured → rebuilt preprocessing with parameterised cutoffs and added unit tests',R:'Caught before the demo, not after delivery. Added signal quality validation to the full pipeline.'},
   prose:'Take ownership immediately — do not blame the data or the library. Show the debugging methodology: you formed a hypothesis (the problem is in preprocessing, not the model), tested it (residual analysis), found root cause (filter cutoffs), fixed and tested systematically. The real learning: ML bugs live in data pipelines far more often than in model code. The fact you caught it before the demo shows engineering discipline.'},
  {id:'b4',type:'common',cat:'c-beh',
   title:'Why ML Engineering Over Research?',
   q:'Why do you want to be an ML engineer rather than a researcher?',
   prose:'I genuinely enjoy building things that get used. With BeatNet, there is a physical package that Aventusoft is integrating into their wearable — that feedback loop is what motivates me. I am comfortable on both sides: I do research on EviDet v2 at UF\'s autonomy lab while also having production deployment experience at Open Weaver. ML engineering is where they intersect — you have to make research-informed implementation decisions constantly. I want to build systems that work reliably at scale, not just in notebooks.'},
  {id:'b5',type:'tradeoff',cat:'c-beh',
   title:'RAG vs Fine-Tuning Decision',
   q:'How do you decide between RAG and fine-tuning?',
   prose:'First question I always ask: is the knowledge static or does it change frequently? If it is dynamic — SEC filings update quarterly, a product catalogue changes daily — RAG wins because baking that into model weights means constant retraining. FinAgent is a perfect example. But if the problem is about changing behaviour — tone, format, domain vocabulary, style — RAG cannot fix that. BeatNet is the other example: ECG arrhythmia patterns are stable medical knowledge, so fine-tuning a foundation model is the right call. The cost ladder matters too: prompting is free, RAG adds a retrieval hop, fine-tuning takes GPU hours — always try the cheaper option first before escalating.'},
  {id:'b6',type:'tradeoff',cat:'c-beh',
   title:'Accuracy vs Latency Tradeoff',
   q:'Describe a time you had to trade accuracy for latency.',
   star:{S:'Open Weaver production chatbot had P95 latency >2s — users were abandoning sessions',T:'Reduce latency without losing meaningful response quality',A:'ONNX export → TensorRT FP16 (minor precision reduction) → measured quality on 500 test queries before/after',R:'24% latency reduction; quality drop <0.5% on evaluation set — accepted tradeoff'},
   prose:'Frame this as a data-driven decision, not a guess. You measured quality before and after — that is the key detail. FP16 is almost always safe for inference. Always have the 24% number ready. If they push further: INT8 would give more gains but requires calibration data and more careful validation — you stopped at FP16 because the latency requirement was already met.'},
  {id:'b7',type:'common',cat:'c-beh',
   title:'Strengths and Weaknesses',
   q:"What's your biggest strength and weakness as an ML engineer?",
   prose:'Strength: I think in systems, not just models. When I work on a project, I am naturally considering the data pipeline, the serving latency, the monitoring story, and the failure modes at the same time — not just the model accuracy. BeatNet is the clearest example: from raw ECG signal to production package in one coherent system. Weakness: I sometimes over-engineer early — I catch myself wanting to build the "correct" architecture before I have even validated the baseline. I have gotten better at shipping a working v1 and iterating, but it is something I consciously watch for.'},
  {id:'b8',type:'tips',cat:'c-beh',
   title:'Tips for ML Behavioral Rounds',
   q:'General advice for navigating ML engineer behavioral interviews.',
   prose:'Always quantify your results — "24% latency reduction", "0.976 micro-AUROC", "99% time reduction." Interviewers remember numbers. Explain your decisions as deliberate choices, not accidents: "I chose LLaMA over GPT-4 because..." shows engineering maturity. In STAR answers, keep Situation and Task to one sentence each — spend the most time on Action (what you personally did) and Result. Avoid "we" — own your contributions. For every project, prepare a "what would you do differently?" answer — it signals self-awareness. End the interview with a genuine question: "What is the biggest unsolved ML engineering challenge on your team right now?" shows you are thinking about the job already.'},
  {id:'b9',type:'tips',cat:'c-beh',
   title:'Questions to Ask Your Interviewer',
   q:'What should you ask at the end of an ML engineering interview?',
   prose:'"What does the ML infrastructure stack look like today — are you investing in MLOps tooling?" This shows you care about the full lifecycle, not just model training. "How do you handle model degradation in production — is retraining automated or manual?" This shows systems-level thinking. "What is the biggest unsolved ML challenge on the team right now?" This is the most powerful question — it opens a real technical conversation and signals genuine interest. "How does the team balance research exploration versus production delivery timelines?" — good for understanding engineering culture. Avoid yes/no questions and anything easily answered by the company website.'},
  {id:'b11',type:'collaboration',cat:'c-beh',
   title:'Disagreeing with a Technical Decision',
   q:'Tell me about a time you disagreed with a technical direction and what you did.',
   star:{
    S:'During BeatNet, a teammate proposed using a 2D CNN on a spectrogram image of the ECG signal rather than a 1D model on the raw signal.',
    T:'I believed the 1D approach was technically superior but needed to make the case without derailing team momentum.',
    A:'I ran a quick side-by-side experiment over a weekend — trained a lightweight 1D baseline and a 2D spectrogram CNN on the same 500-sample pilot set, compared Dice scores and inference time. I brought the results to the team as data, not as opinion. I also acknowledged what the 2D approach offered: more intuitive visualisation.',
    R:'The 1D approach showed 4% higher Dice and 3x faster inference on edge hardware. The team agreed to go with 1D. My teammate then contributed the spectrogram idea to the visualisation layer, which actually improved our IPPD demo.',
   },
   prose:'The key is to disagree with data, not with conviction. Run the experiment, bring the numbers, and frame the conversation around the shared goal — not around being right. Also worth noting: when the decision goes your way, find a way to incorporate the other idea somewhere so nobody feels dismissed.'},
  {id:'b12',type:'collaboration',cat:'c-beh',
   title:'Working Under Ambiguity',
   q:'Describe a time you had to make decisions with incomplete information.',
   star:{
    S:'When starting the FinAgent project, I had no labeled dataset to evaluate against — there were no ground truth answers for "what is Apple\'s gross margin trend over the last 3 years."',
    T:'I needed to build and evaluate a system without a benchmark, under time pressure.',
    A:'I defined a proxy evaluation: I manually created 50 test questions with verified answers by doing the analysis myself using the raw EDGAR filings. I used this as a held-out eval set throughout development. For model quality I used RAGAS faithfulness (does the answer contradict the retrieved context?) as an automated signal, and spot-checked the trickiest cases manually.',
    R:'The eval harness caught two regression bugs during development that I would have missed otherwise. The 50-question benchmark became the basis for the results section of the project writeup.',
   },
   prose:'When there is no benchmark, build one. Even a small, manually verified eval set gives you a signal to optimise against. This is one of the most important skills in applied ML — knowing how to measure progress when the target is ambiguous.'},
  {id:'b13',type:'collaboration',cat:'c-beh',
   title:'Explaining a Technical Decision to Non-Engineers',
   q:'Give an example of explaining a complex technical concept to a non-technical audience.',
   star:{
    S:'The BeatNet IPPD committee included professors from electrical engineering and business who were evaluating architectural decisions, not ML details.',
    T:'The QRB2 memo needed to justify why we chose a foundation model over a simpler baseline in terms of risk, cost, and delivery timeline — not in terms of model architecture.',
    A:'I reframed the decision entirely in business terms: training from scratch would require 6 months of data collection to reach clinical-grade accuracy (high risk, high delay). The foundation model required 3 weeks of fine-tuning on existing data (lower risk, faster delivery, proven starting point). I used a single analogy: "hiring an experienced cardiologist and teaching them our specific labeling scheme" vs "training a medical student from scratch." The memo avoided all ML jargon.',
    R:'The committee approved the architecture with no objections. One member specifically cited the risk framing in their feedback.',
   },
   prose:'The meta-skill here is audience modeling. Before you write or speak, ask: what does this person care about? A committee cares about risk, timeline, and cost — not model architecture. Lead with their frame, use analogies from their world, and introduce technical terms only if they add clarity, not to signal expertise.'},
  {id:'b14',type:'growth',cat:'c-beh',
   title:'Learning Something New Quickly',
   q:'Tell me about a time you had to learn an unfamiliar technology quickly to deliver something.',
   star:{
    S:'At Open Weaver I was asked to optimise inference for a production chatbot using TensorRT — a tool I had never used before, with a two-week delivery window.',
    T:'Deliver a measurable latency reduction using TensorRT without breaking the production model.',
    A:'I spent the first two days reading the TensorRT developer guide and running the sample notebooks end to end before touching the production model. I then built a test harness that ran both the original PyTorch model and the TRT model on the same 500-sample batch and compared outputs numerically before deploying anything. I worked the optimisation in three stages: ONNX export first (lowest risk), then FP16 (almost lossless), then layer fusion (TRT does this automatically). At each stage I measured both quality and latency before moving to the next.',
    R:'Delivered a 24% latency reduction in 12 days. The staged approach meant I never broke the production model.',
   },
   prose:'Learning under deadline: read the docs for two days before writing a line of code — it saves more time than it costs. Build a comparison harness before optimising anything so you can measure the effect of each change. And go incrementally: the lowest-risk change first, measure, then proceed.'},
  {id:'b15',type:'growth',cat:'c-beh',
   title:'Receiving Difficult Feedback',
   q:'Tell me about a time you received critical feedback and how you responded.',
   star:{
    S:'After my first QRB1 IPPD review for BeatNet, the committee flagged that my preprocessing pipeline lacked unit tests and my evaluation section had no confidence intervals — it looked like I was reporting a single lucky run.',
    T:'Address both concerns before QRB2 while continuing to develop the model.',
    A:'I took a day to add unit tests for every preprocessing function (filter response, R-peak detection, beat segmentation boundaries) and set up pytest to run them on every commit. For the evaluation, I re-ran the full model across 5 random seeds and reported mean ± std AUROC instead of a single number. I added a short methodology note to the memo explaining the evaluation protocol.',
    R:'QRB2 went smoothly — the committee specifically praised the improved rigor. The unit tests later caught the filter cutoff bug I described elsewhere.',
   },
   prose:'Good feedback is a gift — treat it that way. Do not defend, do not explain. Say thank you, fix it, and come back with evidence that you fixed it. The committee remembered the improvement, not the original gap.'},
  {id:'b16',type:'tradeoff',cat:'c-beh',
   title:'Build vs Buy Decision',
   q:'Describe a time you had to decide whether to build a component from scratch or use an existing tool.',
   star:{
    S:'For FinAgent I needed a vector store. Options were: FAISS (build/maintain myself), Pinecone (managed cloud), or Chroma (local managed).',
    T:'Choose the right vector store for a prototype that might need to scale to production.',
    A:'I evaluated on four criteria: cost (Pinecone charges per vector at scale), data privacy (SEC filings should not leave local infrastructure), operational complexity (Pinecone requires API key management and has a managed dependency), and scale requirements (300 chunks → exact search is fine, no need for ANN approximation). FAISS IndexFlatL2 won on all four: free, local, zero dependencies, exact search.',
    R:'The choice was correct and held through delivery. If the corpus grew to 10M+ chunks I would revisit Pinecone or Qdrant, but for this scope FAISS was clearly right.',
   },
   prose:'Always evaluate on the actual constraints of your project, not on what is most impressive. "We used Pinecone" does not signal sophistication if a simpler tool was the right call. The ability to articulate WHY you chose the simpler option shows more engineering judgment than choosing complexity by default.'},
  {id:'b17',type:'tradeoff',cat:'c-beh',
   title:'Prioritisation Under Deadline',
   q:'Tell me about a time you had to prioritise ruthlessly under a hard deadline.',
   star:{
    S:'With two weeks before the final BeatNet IPPD delivery, I had three unfinished items: edge inference optimisation, a real-time demo dashboard, and comprehensive evaluation on a held-out clinical test set.',
    T:'Deliver the highest-value items given that all three could not be finished to the same level of polish.',
    A:'I ranked by stakeholder value, not personal interest. Aventusoft\'s primary success criterion was the accuracy number (0.976 AUROC) and the deployable Python package — the dashboard was a nice-to-have. I finished the held-out eval and the Python package first, then spent the remaining time on a minimal but functional inference demo rather than a polished dashboard. I explicitly communicated the prioritisation decision to the team upfront so there were no surprises at delivery.',
    R:'The committee marked the project as satisfying all core requirements. The dashboard gap was noted but did not affect the outcome. Aventusoft received the package they needed.',
   },
   prose:'Prioritisation is about communicating the tradeoff, not just making the call silently. Tell your stakeholders what you are optimising for and what you are deferring. That way the decision is shared and you avoid the situation where someone expected the dashboard and was surprised it was not there.'},

];
const dataQA = [

  {id:'d-sql',cat:'c-sql',tag:'SQL',color:'#34d399',
   title:'SQL — Queries, Indexes & Performance',
   sub:'JOINs · Window Functions · Indexes · EXPLAIN · Transactions · ML Patterns',
   sections:[
    {label:'What to know',
     text:'SQL is the lingua franca of data. ML engineers are expected to write production-quality queries for feature engineering, model evaluation, training data extraction, and monitoring. Key areas: JOINs, window functions, indexes, query plans, transactions, and ML-specific patterns like point-in-time joins and confusion matrix queries.'},
   ],
   qa:[
    {q:'What is the difference between INNER, LEFT, and FULL OUTER JOIN?',
     a:'INNER JOIN returns only rows where the join condition matches in BOTH tables. LEFT JOIN keeps ALL rows from the left table — right side is NULL when there is no match. FULL OUTER JOIN keeps ALL rows from both sides, NULLing the missing side. Rule of thumb: INNER for intersection, LEFT for "keep my main table whole", FULL OUTER for reconciliation. ML use: LEFT JOIN is common when joining predictions to a label table — predictions with NULL labels are unrated examples you can filter or handle separately.'},
    {q:'Explain window functions — ROW_NUMBER, RANK, LAG/LEAD. When do you use each?',
     a:'Window functions compute a value per row using a sliding "window" of rows, without collapsing results like GROUP BY does. ROW_NUMBER(): unique sequential integers per partition — use for deduplication (keep the first row per entity). RANK(): ties share a rank, then ranks skip (1,2,2,4) — use for leaderboards. DENSE_RANK(): ties share a rank, no skips (1,2,2,3). LAG(col, n): the value of col from n rows before the current row. LEAD(col, n): n rows after. ML use: LAG is essential for time-series feature engineering — SELECT *, LAG(sensor_val,1) OVER (PARTITION BY machine_id ORDER BY ts) AS prev_val FROM readings.'},
    {q:'How do B-tree indexes work and when do they hurt?',
     a:'A B-tree index is a sorted tree of column values with pointers to rows. Instead of a full table scan, the DB walks the tree in O(log n) to find matching rows. Good for: =, <, >, BETWEEN, LIKE with prefix patterns. When indexes HURT: (1) INSERT/UPDATE/DELETE slow down because every index must be updated. (2) Low-cardinality columns like a boolean status — a full scan is often faster. (3) Never index tiny tables. Composite index (col_a, col_b): useful for queries on col_a alone OR col_a+col_b together, but NOT col_b alone (leftmost prefix rule).'},
    {q:'How do you debug a slow query using EXPLAIN / EXPLAIN ANALYZE?',
     a:'EXPLAIN shows the query plan; EXPLAIN ANALYZE actually runs it and shows real timings. Look for: (1) Sequential Scan on a large table — usually a missing index. (2) Nested Loop with a large outer table — bad join order or missing index on the inner table. (3) High estimated vs actual row count — stale statistics, run ANALYZE to update the planner. (4) Hash Join vs Merge Join: hash builds an in-memory hash table (good for large unsorted inputs); merge join needs sorted inputs (good when an index already provides order). Steps: EXPLAIN ANALYZE → find the most expensive node → add index or rewrite the query.'},
    {q:'CTEs vs subqueries vs temp tables — when do you choose each?',
     a:'Subquery: nested inline, the DB may or may not materialise it. Good for simple one-off use. CTE (WITH clause): named, readable, can be recursive. In most databases CTEs are NOT automatically materialised — they are inlined like a view. Use WITH ... AS MATERIALIZED in Postgres to force it. Temp Table: always physically written to disk/temp space, survives across statements in the same session. Choose temp table when: the intermediate result is large and referenced many times, or you need to add an index to it. Recursive CTE: WITH RECURSIVE — use for tree/hierarchy traversal (org charts, category paths, knowledge graph BFS).'},
    {q:'Explain ACID. What does each property mean in practice?',
     a:'Atomicity: all operations in a transaction succeed or none do — no partial writes. Consistency: the DB moves from one valid state to another, all constraints hold. Isolation: concurrent transactions behave as if they ran serially — one transaction cannot see another\'s uncommitted changes. Isolation levels from weakest to strongest: READ UNCOMMITTED → READ COMMITTED → REPEATABLE READ → SERIALIZABLE. Durability: committed transactions survive crashes, achieved via write-ahead logging. ML relevance: when writing model predictions + metadata atomically, ACID ensures you never get a prediction row without its metadata.'},
    {q:'Write a query to find the top 3 most confused class pairs from a predictions table.',
     a:'WITH errors AS (SELECT true_label, pred_label, COUNT(*) AS n FROM predictions WHERE true_label != pred_label GROUP BY true_label, pred_label), ranked AS (SELECT *, RANK() OVER (PARTITION BY true_label ORDER BY n DESC) AS rnk FROM errors) SELECT true_label, pred_label, n FROM ranked WHERE rnk <= 3 ORDER BY true_label, rnk; — This reveals the confusion matrix hot spots. Essential for model debugging: which class is most often mistaken for which other class.'},
    {q:'What is a covering index and why does it matter for ML feature queries?',
     a:'A covering index contains all the columns a query needs — the DB can answer the query entirely from the index without touching the base table (an "index-only scan"). Example: a feature engineering query SELECT user_id, event_ts, event_type FROM events WHERE user_id = ? AND event_ts > ? benefits enormously from a covering index on (user_id, event_ts, event_type). Without it: index scan to find rows, then heap fetch for each row. With covering index: just the index, which fits in memory and has sequential access. For large feature tables scanned millions of times per training run, this can be a 10x speedup.'},
   ]},

  {id:'d-nosql',cat:'c-nosql',tag:'NoSQL',color:'#60a5fa',
   title:'NoSQL — Redis, Cassandra, MongoDB & CAP',
   sub:'Key-Value · Document · Wide-Column · CAP Theorem · ML Feature Serving',
   sections:[
    {label:'What to know',
     text:'NoSQL databases power the online serving layer of most ML systems. Redis is the standard online feature store. Cassandra handles write-heavy event logging at scale. Understanding when to use each type, and the CAP tradeoff, is expected in any ML engineer or data engineer interview.'},
   ],
   qa:[
    {q:'What are the four NoSQL database types and when do you use each for ML?',
     a:'Key-Value (Redis, DynamoDB): a hashmap at scale, O(1) get/set. Use for: online feature store (sub-ms reads), session state, caching, rate limiting. Document (MongoDB, Firestore): stores JSON documents, flexible schema. Use for: user profiles, content where each record has different fields. Wide-Column (Cassandra, HBase, Bigtable): row key + flexible columns, optimised for sequential writes. Use for: IoT sensor logs, ML event streams, time-series at billion-row scale. Graph (Neo4j, Neptune): nodes + edges, optimised for multi-hop traversal. Use for: knowledge graphs, recommendation networks, fraud ring detection.'},
    {q:'How does Redis work and why is it the standard online feature store?',
     a:'Redis is an in-memory key-value store — all data lives in RAM, so reads are sub-millisecond. It persists to disk asynchronously via RDB snapshots and AOF logs. Key data structures for ML: Hash (HSET user:1234 age 28 country US — store all features for an entity), Sorted Set (ZADD top_items 0.95 item_A — top-N recommendations), String with TTL (SETEX key 3600 value — auto-expiring features). ML inference needs feature values in <5ms. A SQL scan takes 50–500ms. Redis HGETALL user:1234 returns all features in under 1ms. Limitation: expensive per GB — only hot, recent features go in Redis. Cold/historical features stay in S3 or BigQuery.'},
    {q:'Why is Cassandra designed for write-heavy ML event streams?',
     a:'Cassandra is a distributed, leaderless (no single master) wide-column store with a ring topology. Write path: every write is a sequential append to a commit log, then an in-memory MemTable — no random disk seeks, so writes are extremely fast (100K+/sec per node). Data model: PRIMARY KEY = partition key (determines which node stores the row) + clustering columns (sort order within partition). Example for ML: PRIMARY KEY (user_id, event_ts) puts all events for a user on one node, sorted by time — fast range scans for feature computation. Limitation: no JOINs, no aggregations, no flexible secondary indexes — your table design must be query-driven from the start.'},
    {q:'Explain the CAP theorem and how it guides your database choice.',
     a:'CAP: a distributed system can guarantee at most 2 of Consistency (every read gets the latest write), Availability (every request gets a response), and Partition Tolerance (works despite network splits). Since network partitions happen, the real tradeoff is C vs A during a split. CP systems (HBase, Zookeeper, Redis Cluster) return an error rather than stale data — correctness over availability. AP systems (Cassandra, DynamoDB default) always respond but may return stale data. ML decision: use CP for model registry writes, financial transactions, anything where stale data causes bugs. Use AP for feature serving, recommendation scores, event logging — stale-by-one-second is acceptable, but unavailability would kill the product.'},
    {q:'MongoDB vs PostgreSQL — when would you choose each for an ML application?',
     a:'PostgreSQL: ACID, strong schema, JOINs, window functions, mature indexes, full SQL. Best for: structured ML metadata (experiment tracking, model registry, predictions table), anything requiring JOINs across entities, financial or transactional data. MongoDB: flexible schema (each document can have different fields), horizontal shale out of the box, good for write-heavy workloads at moderate scale. Best for: storing variable-structure model outputs (different models return different JSON schemas), logging heterogeneous events, when schema evolves rapidly in early-stage products. Rule: default to Postgres unless you have a specific reason not to — its flexibility and maturity are underrated.'},
   ]},

  {id:'d-vdb',cat:'c-vdb',tag:'VECTOR DBs',color:'#a78bfa',
   title:'Vector Databases — FAISS, Qdrant, Pinecone & ANN',
   sub:'FAISS · HNSW · IVF · Qdrant · Pinecone · Weaviate · Production RAG',
   sections:[
    {label:'What to know',
     text:'Vector databases are the retrieval backbone of every RAG system. Questions will cover ANN algorithm tradeoffs (HNSW vs IVF), managed vs self-hosted options, metadata filtering, and how to handle updates in a production index. This is directly tied to your FinAgent and ArXivMind work.'},
   ],
   qa:[
    {q:'What is a vector database and how does it differ from FAISS?',
     a:'FAISS is a library — you get the ANN index algorithms (Flat, IVF, HNSW, PQ) but manage the data structure yourself in Python. No persistence, no server, no metadata filtering, no horizontal scaling out of the box. A vector database wraps those same algorithms in a production service: REST/gRPC API, disk-backed persistence, metadata filtering (filter by category before vector search), namespaces, auth, and managed scaling. When to use FAISS: prototyping, small corpus, data privacy requires no external service. When to use a vector DB: production RAG, corpus grows over time, you need filtered search, multi-user access.'},
    {q:'Compare HNSW, IVF, and Flat indexes — when do you use each?',
     a:'Flat (IndexFlatL2): exact brute-force O(n) per query, 100% recall, no training. Correct for any size but slow at scale. Use for: prototypes or corpora under 1M vectors. IVF: clusters vectors into k cells with k-means, then searches only nprobe nearest cells at query time. Sub-linear speed, tunable recall via nprobe. Requires training. Use for: large corpora where memory is tight. HNSW: builds a multi-layer proximity graph, traverses from coarse to fine layers following nearest neighbours. Fast, high recall, no training needed. Memory-heavy (stores graph edges). Does not support deletions well. Use for: production corpora under 50M vectors. IVF+PQ: adds product quantisation to IVF — compresses each vector from 3072 bytes to ~8 bytes. Fits billions in RAM with some recall loss. Use for: internet-scale deployments.'},
    {q:'Compare Pinecone, Qdrant, Weaviate, and Chroma.',
     a:'Chroma: in-process, zero config, open-source. Best for local prototyping and notebooks — not for production scale. Qdrant: Rust-based, open-source, best-in-class filtered vector search (true pre-filtering, not post-filtering). Self-hosted (Docker) or managed cloud. Best for production RAG with rich metadata, cost-sensitive deployments, self-hosted requirements. Weaviate: open-source with managed cloud. Native hybrid search (vector + BM25 in one query). GraphQL interface, auto-vectorisation modules. Best for enterprise RAG without glue code. Pinecone: fully managed SaaS, zero infra ops, simple REST API. Best for teams wanting fast time-to-production. Expensive at billions of vectors. Decision: prototype → Chroma/FAISS. Production with filtering → Qdrant. Zero ops → Pinecone.'},
    {q:'How do you handle document updates and deletions in a production vector index?',
     a:'Insertions are cheap. The problem is updates and deletions. HNSW does not support true in-place deletion — it tombstones entries, wasting memory until a rebuild. Solution: Qdrant handles this automatically via background index optimisation. Pattern for RAG document updates: store doc_id as metadata on every chunk. When a document updates: (1) delete all vectors WHERE doc_id = X (metadata filter delete), (2) re-embed the updated document, (3) insert new vectors with updated doc_id. For versioned corpora (e.g. daily EDGAR filings): store doc_id + version as metadata. Query by old version, delete those, insert the new version. This avoids full index rebuilds.'},
    {q:'What is metadata pre-filtering vs post-filtering and why does it matter?',
     a:'Post-filtering: run ANN search to get top-k results, then filter out ones that do not match your metadata criteria. Problem: if 90% of results fail the filter, you wasted compute and may return fewer than k results. Pre-filtering: apply the metadata filter first to identify eligible vectors, then run ANN search only within that subset. Qdrant and Weaviate support true pre-filtering. Pinecone uses a hybrid approach. Why it matters for ML: if your RAG system filters by tenant_id or document_category, post-filtering on a 10M-vector corpus could scan millions of irrelevant results. Pre-filtering keeps latency predictable regardless of filter selectivity.'},
   ]},

  {id:'d-graph',cat:'c-kg',tag:'GRAPH DBs',color:'#c084fc',
   title:'Graph Databases — Neo4j, Cypher & Graph Algorithms',
   sub:'Property Graph · Cypher · PageRank · Community Detection · ML Applications',
   sections:[
    {label:'What to know',
     text:'Graph databases shine when your data is defined by relationships — social networks, knowledge graphs, fraud networks, recommendation engines. You used Neo4j in CourtIQ and NetworkX in ArXivMind. Expect questions on the property graph model, Cypher syntax, and which graph algorithms matter for ML.'},
   ],
   qa:[
    {q:'Explain Neo4j\'s property graph model and how Cypher differs from SQL.',
     a:'Neo4j stores data as nodes (entities with labels like :Player, :Team and properties like name, age) and relationships (directed edges with a type like PLAYS_FOR and properties like year, salary). Cypher is pattern-matching: you describe the shape of the graph you want to find. MATCH (p:Player)-[:PLAYS_FOR {year:2023}]->(t:Team) WHERE t.name="Lakers" RETURN p.name. SQL joins via key equality across tables. Cypher traverses graph edges — cost is proportional to relationships followed, not table size. Graph advantage: "friends of friends" in SQL requires N self-joins; in Cypher it is MATCH (u:User)-[:FOLLOWS*2]->(fof) RETURN fof in one pattern.'},
    {q:'What graph algorithms are most useful for ML?',
     a:'PageRank: scores nodes by how many high-importance nodes point to them (iterative). ML use: rank paper influence in ArXivMind, find authoritative documents for RAG, identify key entities in a fraud graph. Community Detection (Louvain): partitions graph into densely connected communities. ML use: user segmentation, finding paper clusters, detecting fraud rings. Node Similarity (Jaccard, cosine): measures shared neighbours. ML use: "users who interact with similar items" — collaborative filtering without full embedding models. Shortest Path / BFS: find the minimum hops between entities. ML use: multi-hop knowledge graph reasoning. All available via Neo4j GDS: CALL gds.pageRank.stream(\'myGraph\') YIELD nodeId, score.'},
    {q:'When would you use Neo4j vs NetworkX vs a relational DB for a knowledge graph?',
     a:'NetworkX (Python in-memory): for graphs under ~500K nodes that fit in RAM. Zero setup, full Python ecosystem, fast for prototyping. Used in ArXivMind — 500 nodes, no server needed. Neo4j: for graphs that exceed RAM, need concurrent access, require production persistence, or where Cypher queries are more natural than Python code. Used in CourtIQ — player/team history with complex relationship queries. Relational DB: if the graph is shallow (1-2 hops) and data is naturally tabular, a SQL adjacency list with a recursive CTE can work. Once you need 3+ hops or complex pattern matching, SQL becomes unwieldy and Neo4j wins decisively.'},
   ]},

  {id:'d-pipe',cat:'c-pipe',tag:'PIPELINES',color:'#fb923c',
   title:'Data Pipelines — Kafka, Airflow, Batch vs Stream, CDC',
   sub:'Kafka · Apache Airflow · Batch vs Stream · Change Data Capture · dbt',
   sections:[
    {label:'What to know',
     text:'Data pipelines are how raw data becomes model-ready features. Kafka powers real-time ML event streams (you used it at Plumb5). Airflow orchestrates batch training pipelines. Understanding batch vs stream tradeoffs, CDC for real-time features, and dbt for warehouse transforms is expected at any ML/data engineering interview.'},
   ],
   qa:[
    {q:'How does Kafka work and why is it used for ML data pipelines?',
     a:'Kafka is a distributed, durable, append-only log. Producers write events to topics. Consumers read at their own pace, each tracking their own offset — so a slow consumer never blocks others. Topics are split into partitions for horizontal scale, and each partition is replicated across brokers for fault tolerance. Key properties for ML: (1) Durable and replayable — consumers can re-read any historical offset. (2) Decoupled — the model prediction service writes to Kafka independently of the feature pipeline that reads from it. (3) High throughput — millions of events/sec. ML uses: streaming user events for real-time features, logging every inference for monitoring, triggering feature recomputation on entity changes. Your Plumb5 internship used Kafka to stream user behaviour events for email personalisation.'},
    {q:'Batch processing vs stream processing — when do you use each for ML?',
     a:'Batch: process a bounded, finite dataset all at once. Tools: Spark, dbt, BigQuery scheduled queries. Latency: minutes to hours. Use for: model training, overnight feature recomputation, ETL over historical data, aggregates where slight staleness is acceptable. Stream: process an unbounded, continuous flow of events as they arrive. Tools: Kafka Streams, Apache Flink, Spark Structured Streaming. Latency: milliseconds to seconds. Use for: real-time fraud detection, recommendation triggers, live feature updates. Lambda architecture: run both layers in parallel (batch for correctness, stream for low latency) — complex, two codebases. Kappa architecture: everything is a stream, historical reprocessing is done by replaying Kafka — simpler when Kafka retention is long enough.'},
    {q:'How do you build reliable ML pipelines with Apache Airflow?',
     a:'Airflow lets you define DAGs in Python — each node is a task (PythonOperator, SparkSubmitOperator, DbtRunOperator), each edge is a dependency. Best practices: (1) Idempotent tasks — re-running a task on the same date produces the same result, critical for retry logic. (2) Use logical date (ds) for partitioned data — each run processes only its own date partition. (3) Sensor operators (S3KeySensor, SqlSensor) to wait for upstream data before running. (4) Separate DAGs for ingestion, feature engineering, training, evaluation, and deployment — link them with ExternalTaskSensor. Backfilling: run historical executions with airflow dags backfill --start-date X --end-date Y to retroactively compute features for a new model.'},
    {q:'What is Change Data Capture (CDC) and why does it matter for ML features?',
     a:'CDC captures every INSERT, UPDATE, and DELETE event from a source database by reading the database write-ahead log (WAL in Postgres, binlog in MySQL), then streams those events to Kafka via tools like Debezium. Instead of polling the DB every N seconds, you react to changes the instant they happen. ML relevance: (1) Real-time feature updates — when a user record changes in Postgres, CDC immediately triggers a feature recomputation and Redis cache update. (2) Training data freshness — maintain a low-latency training dataset without expensive full-table scans. (3) Point-in-time correctness — CDC events carry timestamps so you can reconstruct the exact state of any feature at any historical moment, preventing training/serving skew. Debezium + Kafka is the standard open-source stack.'},
    {q:'What is dbt and how does it fit into an ML feature pipeline?',
     a:'dbt (data build tool) lets you define SQL transformations as versioned models — each model is a SELECT statement, dbt handles dependency ordering, incremental materialisation, testing, and documentation. In an ML pipeline: raw events land in the warehouse via Fivetran/Airbyte → dbt computes feature tables (rolling averages, entity aggregates, cohort labels) → those tables serve as the offline feature store for training. Why dbt matters for ML: (1) Incremental models — only reprocess new data each run, not full recompute. (2) Data tests — assert(column IS NOT NULL), uniqueness, referential integrity — catch data quality issues before they poison training data. (3) Documentation and lineage — know exactly which upstream tables feed each feature. (4) Same SQL logic runs in dev/staging/prod — no environment drift.'},
   ]},

  {id:'d-dw',cat:'c-dw',tag:'DATA WAREHOUSE',color:'#f472b6',
   title:'Data Warehousing — OLAP, Star Schema, Lakehouse',
   sub:'OLTP vs OLAP · Star Schema · SCD Type 2 · Delta Lake · Time Travel',
   sections:[
    {label:'What to know',
     text:'Data warehouses are where training data lives. Understanding columnar storage, star schema design, Slowly Changing Dimensions (SCD) for point-in-time correctness, and modern lakehouse concepts (Delta Lake, Iceberg, time travel) is critical for avoiding data leakage in ML models.'},
   ],
   qa:[
    {q:'OLTP vs OLAP — what are the differences and why does ML always use OLAP for training data?',
     a:'OLTP (Online Transaction Processing): row-oriented storage, optimised for many small read/write transactions — single-row lookups, inserts, updates. Examples: Postgres, MySQL, DynamoDB. OLAP (Online Analytical Processing): column-oriented storage, optimised for a few large analytical queries that scan millions of rows and aggregate. Examples: BigQuery, Snowflake, Redshift, ClickHouse. Why column-oriented wins for ML: a feature engineering query computing AVG(revenue) only reads one column, not all columns of every row. Column stores also compress far better — similar values are adjacent. Training data extraction (SELECT * FROM events WHERE date BETWEEN X AND Y) is a full-table sequential scan — exactly what columnar is built for. Running this on an OLTP database would be 10–100x slower.'},
    {q:'Star schema vs snowflake schema — which is better for ML feature pipelines?',
     a:'Star schema: one central fact table (events, transactions, predictions) surrounded by denormalised dimension tables (users, items, dates). Simple to query — typically one or two joins. Snowflake schema: dimensions are further normalised into sub-dimensions (users → countries → regions). More storage efficient, but requires more joins. For ML feature engineering, star schema is almost always preferred — fewer joins, simpler queries, faster execution. The extra storage cost of denormalisation is trivial compared to the compute cost of deep snowflake joins on billions of rows.'},
    {q:'What is a Slowly Changing Dimension (SCD) and why does it matter for training data correctness?',
     a:'An SCD is a dimension (like a user table) where attributes change over time — a user changes their country, job title, or subscription tier. SCD Type 1: overwrite the old value — simple, but you lose history. SCD Type 2: add a new row with valid_from and valid_to dates, preserving full history. ML implication: when building training labels, you must join on the dimension record that was active at the time of the event, not the current record. If a user was in Germany when they made a purchase, using their current UK address for training causes data leakage. SCD Type 2 + a point-in-time join is the correct approach. Joining on the current dimension is one of the most common sources of training/serving skew.'},
    {q:'What is a Lakehouse and how do Delta Lake/Iceberg time travel help ML?',
     a:'A Lakehouse (Delta Lake, Apache Iceberg, Apache Hudi) adds ACID transactions, schema enforcement, UPDATE/DELETE support, and versioning on top of cheap object storage (S3, GCS). Unlike a pure data lake (write-once files), a Lakehouse lets you correct historical data, enforce schemas, and maintain table versions. Time travel: query the table as it was at any historical point — SELECT * FROM events VERSION AS OF \'2024-01-15\' in Delta. ML relevance: (1) Reproduce any historical training dataset exactly — critical for model debugging and regulatory compliance. (2) Roll back a bad data write without reprocessing everything. (3) Incremental reads — only process new rows since the last training run. (4) GDPR compliance — DELETE user data from historical tables without rebuilding from scratch.'},
   ]},

  {id:'d-fs',cat:'c-sys',tag:'FEATURE STORES',color:'#22d3ee',
   title:'Feature Stores — Design, Serving & Training/Serving Skew',
   sub:'Feast · Tecton · Offline Store · Online Store · Point-in-Time Joins · Skew',
   sections:[
    {label:'What to know',
     text:'Feature stores are considered the most critical ML infrastructure component. They solve the gap between data engineering (computing features) and ML engineering (using them). Expect questions on the dual-store pattern, point-in-time correctness, and how skew happens and is detected. This ties directly to your ML systems knowledge.'},
   ],
   qa:[
    {q:'What is a feature store and why is it important?',
     a:'A feature store is a centralised platform for computing, storing, sharing, and serving ML features consistently across training and serving. Without one: every team recomputes the same features independently, training SQL computes features differently from serving Python code (causing skew), features cannot be reused across teams, and there is no historical record for point-in-time joins. Dual storage pattern: Offline store (S3/BigQuery/Parquet) — full feature history for training, handles arbitrary historical queries. Online store (Redis/DynamoDB) — latest feature values for <5ms serving. A write pipeline keeps both in sync: when a feature is computed, it is written to both stores atomically. Examples: Feast (open-source), Tecton (managed, most mature), Hopsworks, Vertex AI Feature Store.'},
    {q:'What is training/serving skew and how do you prevent and detect it?',
     a:'Skew: the feature value the model was trained on is different from what it receives at serving time. The model degrades in ways invisible until you monitor carefully. Common causes: (1) Different code paths — SQL for training computes "days since last purchase" differently from Python at serving. (2) Clock differences — training uses end-of-day snapshot, serving uses real-time value. (3) Different null handling. (4) Wrong join — training joins on current dimension value, serving uses historical. Prevention: (1) Single feature definition — one function defines the feature for both training and serving (the feature store runs the same code in both contexts). (2) Point-in-time joins — training always uses the historical value. (3) Feature versioning — serving uses the same version the model was trained on. Detection: compute PSI (Population Stability Index) between training feature distribution and serving distribution. PSI > 0.2 = significant skew. Tools: Evidently AI, Arize, WhyLogs.'},
    {q:'Explain point-in-time correct joins — what goes wrong without them?',
     a:'A point-in-time join retrieves the feature value that existed at the time of each training label event — not the current value and not a later value. Example: you are training a churn model. A user churned on 2024-03-10. Their "last_login_days_ago" feature on 2024-03-10 was 45. If you join on today\'s value (say 400), you are training on information that did not exist at prediction time — this is future leakage. The model learns from the future and will perform significantly better in offline eval than in production. Feature stores implement this via range joins: for each label event at time t, join the feature row with the most recent value WHERE feature_ts <= event_ts. Without a feature store this is expensive to implement correctly in raw SQL, which is why teams skip it and wonder why their offline metrics do not match production.'},
    {q:'How would you build a simple feature store from scratch without managed tooling?',
     a:'Offline store: store feature data as Parquet partitioned by date in S3 (s3://features/user_features/date=2024-03-10/). Write a Python class that reads these partitions and performs point-in-time joins using pandas merge_asof or a SQL range join in BigQuery. Online store: use Redis Hashes keyed by entity ID (HSET user:1234 age 28 country US last_purchase 1.50). Write a sync job that runs after each feature computation and writes latest values to Redis. Feature registry: a simple YAML or database table mapping feature names to their computation logic, offline path, and online key pattern. Versioning: include model_version in the Redis key or as a metadata field so you can serve different feature versions to different model versions simultaneously. This is essentially what Feast provides — understanding it from scratch shows you know what the tooling is doing under the hood.'},
   ]},
];

export { notesData, qaData, archData, projectsData, experienceData, behavioralData, dataQA };