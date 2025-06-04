import {LitElement, html, css} from 'https://unpkg.com/lit@2/index.js?module';
import {unsafeHTML} from 'https://unpkg.com/lit@2/directives/unsafe-html.js?module';

export class RoiCalculatorForm extends LitElement {
  static properties = {
    platform: {type: String},
    operationalSatisfaction: {type: String},
    backlogEfficiency: {type: String},
    challenges: {type: Array},
    roadmapClarity: {type: String},
    name: {type: String},
    email: {type: String},
    jobTitle: {type: String},
    companyName: {type: String},
    formSubmitted: {type: Boolean},
    formErrors: {type: Object},
    totalScore: {type: Number},
    showScore: {type: Boolean},
    meetingRequested: {type: Boolean},
    csrfToken: {type: String},
    portalId: {type: String, attribute: 'portal-id'},
    formGuid: {type: String, attribute: 'form-guid'}
  };

  constructor () {
    super();
    this.platform = '';
    this.operationalSatisfaction = '';
    this.backlogEfficiency = '';
    this.challenges = [];
    this.roadmapClarity = '';
    this.name = '';
    this.email = '';
    this.jobTitle = '';
    this.companyName = '';
    this.formSubmitted = false;
    this.formErrors = {};
    this.totalScore = 0;
    this.showScore = false;
    this.meetingRequested = false;
    this.portalId = '';
    this.formGuid = '';
    const storedToken = localStorage.getItem('csrfToken');
    if (storedToken) {
      this.csrfToken = storedToken;
    } else {
      this._generateCsrfToken();
    }
  }

  _generateCsrfToken () {
    try {
      const array = new Uint8Array(16);
      window.crypto.getRandomValues(array);
      this.csrfToken = Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');

      localStorage.setItem('csrfToken', this.csrfToken);
    } catch (error) {
      console.error('Error generating CSRF token:', error);
    }
  }

  _getPlatformValue () {
    return this.platform;
  }

  _getOperationalSatisfactionScore () {
    const scores = {
      'Very unhappy': 0.00,
      'Unhappy': 0.75,
      'Neutral': 1.5,
      'Happy': 2.25,
      'Very happy': 3.0
    };
    return scores[this.operationalSatisfaction] || 0;
  }

  _getBacklogEfficiencyScore () {
    const scores = {
      'Very unhappy': 0.00,
      'Unhappy': 0.75,
      'Neutral': 1.5,
      'Happy': 2.25,
      'Very happy': 3.0
    };
    return scores[this.backlogEfficiency] || 0;
  }

  _getChallengesScore () {
    return Math.max(0, 3 - this.challenges.length);
  }

  _getRoadmapClarityScore () {
    const scores = {
      'Yes': 2.0,
      'Somewhat': 1.0,
      'No': 0.00
    };
    return scores[this.roadmapClarity] || 0;
  }

  _calculateTotalScore () {
    const operationalScore = this._getOperationalSatisfactionScore();
    const backlogScore = this._getBacklogEfficiencyScore();
    const challengesScore = this._getChallengesScore();
    const roadmapScore = this._getRoadmapClarityScore();

    // Calculate raw total score
    const rawScore = operationalScore + backlogScore + challengesScore + roadmapScore;

    // Apply rounding rules
    // 1. If score is 0, return 1
    if (rawScore <= 0) {
      return 1;
    }

    // 2. For other scores, round up if decimal part > 0.8, otherwise round down
    const decimalPart = rawScore - Math.floor(rawScore);
    if (decimalPart > 0.8) {
      return Math.min(10, Math.ceil(rawScore));
    } else {
      return Math.max(1, Math.min(10, Math.floor(rawScore)));
    }
  }

  static styles = css`
      :host {
          display: block;
          font-family: 'Montserrat', Arial, sans-serif;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          box-sizing: border-box;
          color: white;
          background-color: #0F102E;
      }

      .form-header {
          text-align: center;
          margin-bottom: 30px;
      }

      .form-title {
          color: white;
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 10px;
          margin-top: 0;
      }

      .form-subtitle {
          color: #00FFFF;
          font-size: 16px;
          margin-top: 0;
          margin-bottom: 0;
          line-height: 1.5;
      }

      .form-group {
          margin-bottom: 25px;
      }

      label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          color: white;
          font-size: 14px;
      }

      select, input[type="text"], input[type="email"] {
          width: 100%;
          padding: 12px;
          border: 1px solid #e0e0e0;
          border-radius: 6px;
          box-sizing: border-box;
          font-size: 16px;
          transition: border-color 0.3s, box-shadow 0.3s;
          background-color: #f9f9f9;
      }

      select:focus, input[type="text"]:focus, input[type="email"]:focus {
          outline: none;
          border-color: #00FFFF;
          box-shadow: 0 0 0 2px rgba(0, 255, 255, 0.2);
      }

      .radio-group, .checkbox-group {
          margin-top: 10px;
      }

      .radio-option, .checkbox-option {
          display: flex;
          align-items: center;
          margin-bottom: 12px;
          font-size: 14px;
          cursor: pointer;
      }

      .radio-option input[type="radio"], .checkbox-option input[type="checkbox"] {
          margin-right: 10px;
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          width: 18px;
          height: 18px;
          border: 2px solid #e0e0e0;
          border-radius: 50%;
          outline: none;
          transition: all 0.2s ease-in-out;
          position: relative;
          cursor: pointer;
      }

      .checkbox-option input[type="checkbox"] {
          border-radius: 4px;
      }

      .radio-option input[type="radio"]:checked, .checkbox-option input[type="checkbox"]:checked {
          border-color: #00FFFF;
          background-color: #0F102E;
      }

      .radio-option input[type="radio"]:checked::after {
          content: '';
          position: absolute;
          top: 3px;
          left: 3px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #00FFFF;
      }

      .checkbox-option input[type="checkbox"]:checked::after {
          content: '✓';
          position: absolute;
          top: -2px;
          left: 3px;
          font-size: 14px;
          color: #00FFFF;
      }

      .error-message {
          color: #e91e63;
          font-size: 14px;
          margin-top: 5px;
      }

      button {
          background-color: #e91e63;
          color: white;
          padding: 14px 28px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 16px;
          margin-right: 10px;
          font-weight: 600;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          box-shadow: 0 4px 8px rgba(233, 30, 99, 0.3);
      }

      button:hover {
          background-color: #d81b60;
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(233, 30, 99, 0.4);
      }

      .success-message {
          color: #00FFFF;
          font-weight: bold;
          margin-top: 20px;
          margin-bottom: 20px;
      }

      .score-container {
          background-color: #0F102E;
          border: 1px solid #00FFFF;
          border-radius: 12px;
          padding: 30px;
          margin-top: 40px;
          margin-bottom: 40px;
          text-align: center;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
      }

      .score-title {
          font-size: 22px;
          margin-bottom: 20px;
          color: white;
          font-weight: 700;
      }

      .score-value {
          font-size: 48px;
          font-weight: 800;
          margin-bottom: 20px;
          display: inline-block;
          position: relative;
      }

      .score-value::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 40px;
          height: 3px;
          background-color: #00FFFF;
      }

      .score-value-red {
          color: #e53935;
      }

      .score-value-amber {
          color: #ff8f00;
      }

      .score-value-yellow {
          color: #fdd835;
      }

      .score-value-green {
          color: #43a047;
      }

      .score-description {
          font-size: 16px;
          margin-bottom: 30px;
          line-height: 1.6;
          max-width: 80%;
          margin-left: auto;
          margin-right: auto;
          font-weight: bold;
      }

      /* No additional styles needed for request-meeting-button as they're inherited from the base button styles */

      .meeting-requested-message {
          color: #00FFFF;
          font-weight: bold;
          margin-top: 15px;
          font-size: 16px;
      }

      .score-summary-text {
          font-size: 16px;
          line-height: 1.6;
          margin-bottom: 30px;
          text-align: left;
          color: white;
          white-space: pre-line;
      }

      .score-slider-container {
          width: 100%;
          height: 12px;
          margin: 40px 0 30px;
          position: relative;
          background: linear-gradient(to right, #e53935, #ff8f00, #fdd835, #43a047);
          border-radius: 6px;
          box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.2);
      }

      .score-marker {
          position: absolute;
          top: -8px;
          width: 8px;
          height: 28px;
          background-color: aqua;
          border-radius: 4px;
          transform: translateX(-50%);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
      }

      p {
          text-align: left;
      }

      p.form-subtitle {
          text-align: center;
          font-weight: bolder;
      }

  `;

  render () {
    return html`
      <div class="roi-calculator-form">
        <div class="form-header">
          <h2 class="form-title">Scale Smarter Health Check</h2>
          <p class="form-subtitle">Evaluate the performance of your commerce platform</p>
          ${!this.formSubmitted ? html`
            <p>Operational inefficiencies, ongoing challenges, and unclear roadmaps can quietly stall your growth and limit your ability to scale effectively. Without a clear understanding of your platform's performance, it's difficult to prioritise investments and address critical gaps.</p> 
            <p>The Scale Smarter Health Check provides a clear, concise score that highlights your current standing, enabling you to make informed, strategic decisions and confidently plan your next steps toward sustainable growth.</p>
          ` : ''}
        </div>

        ${this.formSubmitted ?
      html`
            ${this.showScore ?
        html`
                <div class="score-container">
                  <div class="score-title">Your current health score</div>
                  <div class="score-value ${this._getScoreColorClass()}">${this.totalScore}/10</div>
                  <div class="score-description  ${this._getScoreColorClass()}">
                  ${this._getScoreExplainTitle(this.totalScore)}
                  </div>

                  <div class="score-slider-container">
                    <div class="score-marker" style="left: ${this._getScorePercentage()}%">
                    </div>
                  </div>

                  <div class="score-summary-text">
                    ${unsafeHTML(this._getScoreSummaryText())}
                  </div>

                  ${this.meetingRequested ?
          html`<div class="meeting-requested-message">Thank you, our team will be in touch shortly to schedule a meeting</div>` :
          html`<button class="request-meeting-button" @click=${this._handleRequestMeeting}>BOOK A MEETING</button>`
        }
                </div>
              ` : ''
      }
          ` :
      html`
            <form @submit=${this._handleSubmit}>
              <!-- Commerce Platform -->
              <div class="form-group">
                <label for="platform">What is your commerce platform?</label>
                <select id="platform" @change=${this._handlePlatformChange} .value=${this.platform}>
                  <option value="" disabled selected>Select your platform</option>
                  <option value="Shopify Starter">Shopify Starter</option>
                  <option value="Shopify Basic">Shopify Basic</option>
                  <option value="Standard Shopify">Standard Shopify</option>
                  <option value="Shopify Advanced">Shopify Advanced</option>
                  <option value="Shopify Plus">Shopify Plus</option>
                  <option value="Magento Open Source">Magento Open Source</option>
                  <option value="Adobe Commerce Cloud">Adobe Commerce Cloud</option>
                  <option value="Adobe Commerce On-Prem">Adobe Commerce On-Prem</option>
                  <option value="BigCommerce">BigCommerce</option>
                  <option value="WordPress (WooCommerce)">WordPress (WooCommerce)</option>
                  <option value="Other">Other</option>
                </select>
                ${this.formErrors.platform ? html`<div class="error-message">${this.formErrors.platform}</div>` : ''}
              </div>

              <!-- Operational Support Satisfaction -->
              <div class="form-group">
                <label>How happy are you with the quality of your operational support?</label>
                <div class="radio-group">
                  ${['Very unhappy', 'Unhappy', 'Neutral', 'Happy', 'Very happy'].map(option => html`
                    <label class="radio-option">
                      <input type="radio" name="operationalSatisfaction" value="${option}" 
                        ?checked=${this.operationalSatisfaction === option}
                        @change=${this._handleOperationalSatisfactionChange}>
                      ${option}
                    </label>
                  `)}
                </div>
                ${this.formErrors.operationalSatisfaction ? html`<div class="error-message">${this.formErrors.operationalSatisfaction}</div>` : ''}
              </div>

              <!-- Backlog Efficiency Satisfaction -->
              <div class="form-group">
                <label>How happy are you with your backlog efficiency?</label>
                <div class="radio-group">
                  ${['Very unhappy', 'Unhappy', 'Neutral', 'Happy', 'Very happy'].map(option => html`
                    <label class="radio-option">
                      <input type="radio" name="backlogEfficiency" value="${option}" 
                        ?checked=${this.backlogEfficiency === option}
                        @change=${this._handleBacklogEfficiencyChange}>
                      ${option}
                    </label>
                  `)}
                </div>
                ${this.formErrors.backlogEfficiency ? html`<div class="error-message">${this.formErrors.backlogEfficiency}</div>` : ''}
              </div>

              <!-- Challenges -->
              <div class="form-group">
                <label>What are the biggest challenges you face in your role? (select up to 3)</label>
                <div class="checkbox-group">
                  ${['Development delays', 'Performance issues', 'Integration gaps', 'Platform limits', 'Unclear roadmap', 'Skills gap'].map(option => html`
                    <label class="checkbox-option">
                      <input type="checkbox" value="${option}" 
                        ?checked=${this.challenges.includes(option)}
                        @change=${this._handleChallengesChange}>
                      ${option}
                    </label>
                  `)}
                </div>
                ${this.formErrors.challenges ? html`<div class="error-message">${this.formErrors.challenges}</div>` : ''}
              </div>

              <!-- Roadmap Clarity -->
              <div class="form-group">
                <label>Do you have clear project roadmaps?</label>
                <div class="radio-group">
                  ${['Yes', 'Somewhat', 'No'].map(option => html`
                    <label class="radio-option">
                      <input type="radio" name="roadmapClarity" value="${option}" 
                        ?checked=${this.roadmapClarity === option}
                        @change=${this._handleRoadmapClarityChange}>
                      ${option}
                    </label>
                  `)}
                </div>
                ${this.formErrors.roadmapClarity ? html`<div class="error-message">${this.formErrors.roadmapClarity}</div>` : ''}
              </div>

              <!-- Contact Details -->
              <div class="form-group">
                <label for="name">Name</label>
                <input type="text" id="name" .value=${this.name} @input=${this._handleNameChange}>
                ${this.formErrors.name ? html`<div class="error-message">${this.formErrors.name}</div>` : ''}
              </div>

              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" .value=${this.email} @input=${this._handleEmailChange}>
                ${this.formErrors.email ? html`<div class="error-message">${this.formErrors.email}</div>` : ''}
              </div>

              <div class="form-group">
                <label for="jobTitle">Job Title</label>
                <input type="text" id="jobTitle" .value=${this.jobTitle} @input=${this._handleJobTitleChange}>
                ${this.formErrors.jobTitle ? html`<div class="error-message">${this.formErrors.jobTitle}</div>` : ''}
              </div>

              <div class="form-group">
                <label for="companyName">Company Name</label>
                <input type="text" id="companyName" .value=${this.companyName} @input=${this._handleCompanyNameChange}>
                ${this.formErrors.companyName ? html`<div class="error-message">${this.formErrors.companyName}</div>` : ''}
              </div>

              <button type="submit">VIEW YOUR HEALTH SCORE</button>
            </form>
          `
    }
      </div>
    `;
  }

  // Event handlers
  _handlePlatformChange (e) {
    this.platform = e.target.value;
  }

  _handleOperationalSatisfactionChange (e) {
    this.operationalSatisfaction = e.target.value;
  }

  _handleBacklogEfficiencyChange (e) {
    this.backlogEfficiency = e.target.value;
  }

  _handleChallengesChange (e) {
    const value = e.target.value;
    const isChecked = e.target.checked;

    if (isChecked) {
      // Add to array if not already there and if less than 3 items are selected
      if (!this.challenges.includes(value)) {
        if (this.challenges.length < 3) {
          this.challenges = [...this.challenges, value];
        } else {
          // If already 3 items, uncheck the checkbox
          e.target.checked = false;
          // Update the error message
          this.formErrors = {
            ...this.formErrors,
            challenges: 'You can select a maximum of 3 challenges'
          };
          // Clear the error message after 3 seconds
          setTimeout(() => {
            this.formErrors = {
              ...this.formErrors,
              challenges: ''
            };
          }, 3000);
        }
      }
    } else {
      // Remove from array
      this.challenges = this.challenges.filter(item => item !== value);
    }
  }

  _handleRoadmapClarityChange (e) {
    this.roadmapClarity = e.target.value;
  }

  _handleNameChange (e) {
    this.name = e.target.value;
  }

  _handleEmailChange (e) {
    this.email = e.target.value;
  }

  _handleJobTitleChange (e) {
    this.jobTitle = e.target.value;
  }

  _handleCompanyNameChange (e) {
    this.companyName = e.target.value;
  }

  _handleSubmit (e) {
    e.preventDefault();

    // Validate form
    const errors = {};

    if (!this.platform) {
      errors.platform = 'Please select your commerce platform';
    }

    if (!this.operationalSatisfaction) {
      errors.operationalSatisfaction = 'Please select your satisfaction level';
    }

    if (!this.backlogEfficiency) {
      errors.backlogEfficiency = 'Please select your efficiency level';
    }

    if (this.challenges.length === 0) {
      errors.challenges = 'Please select at least one challenge';
    }

    if (!this.roadmapClarity) {
      errors.roadmapClarity = 'Please select your roadmap clarity';
    }

    if (!this.name) {
      errors.name = 'Please enter your name';
    }

    if (!this.email) {
      errors.email = 'Please enter your email';
    } else if (!this._validateEmail(this.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!this.jobTitle) {
      errors.jobTitle = 'Please enter your job title';
    }

    if (!this.companyName) {
      errors.companyName = 'Please enter your company name';
    }

    this.formErrors = errors;

    // If no errors, submit the form
    if (Object.keys(errors).length === 0) {
      // Calculate the total score
      this.totalScore = this._calculateTotalScore();

      // In a real application, you would send the data to a server here
      console.log('Form submitted:', {
        platform: this.platform,
        operationalSatisfaction: this.operationalSatisfaction,
        backlogEfficiency: this.backlogEfficiency,
        challenges: this.challenges,
        roadmapClarity: this.roadmapClarity,
        name: this.name,
        email: this.email,
        jobTitle: this.jobTitle,
        companyName: this.companyName,
        totalScore: this.totalScore
      });

      // Show success message and score
      this.formSubmitted = true;
      this.showScore = true;

      // Dispatch a custom event that can be listened to by the parent
      this.dispatchEvent(new CustomEvent('form-submitted', {
        detail: {
          platform: this.platform,
          operationalSatisfaction: this.operationalSatisfaction,
          backlogEfficiency: this.backlogEfficiency,
          challenges: this.challenges,
          roadmapClarity: this.roadmapClarity,
          name: this.name,
          email: this.email,
          jobTitle: this.jobTitle,
          companyName: this.companyName,
          totalScore: this.totalScore
        },
        bubbles: true,
        composed: true
      }));
    }
  }

  async _handleRequestMeeting () {
    try {
      if (!this.csrfToken) {
        console.log('CSRF token not available, generating now...');
        this._generateCsrfToken();
      }

      const endpoint = `https://api.hsforms.com/submissions/v3/integration/submit/${this.portalId}/${this.formGuid}`;

      const hubspotData = {
        fields: [
          {name: 'platform', value: this.platform},
          {name: 'operational_satisfaction', value: this.operationalSatisfaction},
          {name: 'backlog_efficiency', value: this.backlogEfficiency},
          {name: 'challenges', value: this.challenges.join(';')},
          {name: 'roadmap_clarity', value: this.roadmapClarity},
          {name: 'firstname', value: this.name.split(' ')[0]},
          {name: 'lastname', value: this.name.split(' ').slice(1).join(' ')},
          {name: 'email', value: this.email},
          {name: 'jobtitle', value: this.jobTitle},
          {name: 'company', value: this.companyName},
          {name: 'total_score', value: this.totalScore.toString()}
        ],
        context: {
          pageUri: window.location.href,
          pageName: document.title
        },
        legalConsentOptions: {
          consent: {
            consentToProcess: true,
            text: "I agree to allow the company to store and process my personal data in accordance with the Privacy Policy."
          }
        }
      };

      console.log('Sending data to HubSpot:', hubspotData);

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(hubspotData)
      });

      if (!response.ok) {
        const errorData = await response.json();
      }

      const responseData = await response.json();
      console.log('HubSpot response:', responseData);

      this.meetingRequested = true;
      this.dispatchEvent(new CustomEvent('meeting-requested', {
        detail: {
          name: this.name,
          email: this.email,
          jobTitle: this.jobTitle,
          companyName: this.companyName,
          totalScore: this.totalScore,
          csrfToken: this.csrfToken,
          hubspotResponse: responseData
        },
        bubbles: true,
        composed: true
      }));
    } catch (error) {
      console.error('Error sending meeting request to HubSpot:', error);
      alert(`Failed to request meeting: ${error.message}`);
    }
  }

  _validateEmail (email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  _getScoreColorClass () {
    if (this.totalScore >= 8) {
      return 'score-value-green';
    } else if (this.totalScore >= 6) {
      return 'score-value-yellow';
    } else if (this.totalScore >= 4) {
      return 'score-value-amber';
    } else {
      return 'score-value-red';
    }
  }

  _getScoreExplainTitle () {
    if (this.totalScore >= 8) {
      return 'Well-optimised and ready to lead with continuous innovation';
    } else if (this.totalScore >= 6) {
      return 'Solid foundation with room to optimise and scale more effectively';
    } else if (this.totalScore >= 4) {
      return 'Noticeable inefficiencies and gaps require proactive improvement';
    } else {
      return 'Critical risks are holding back your growth and need urgent attention';
    }
  }

  _sanitizeAndFormatCompanyName () {
    if (!this.companyName) return '';

    // Only sanitize the company name, don't convert to Title Case
    return this.companyName
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  _formatChallenges () {
    // Format challenges with proper English grammar
    if (this.challenges.length === 0) {
      return '';
    } else if (this.challenges.length === 1) {
      return this.challenges[0].toLowerCase();
    } else if (this.challenges.length === 2) {
      return `${this.challenges[0].toLowerCase()} and ${this.challenges[1].toLowerCase()}`;
    } else {
      const allButLast = this.challenges.slice(0, -1);
      const last = this.challenges[this.challenges.length - 1];
      return `${allButLast.map(c => c.toLowerCase()).join(', ')} and ${last.toLowerCase()}`;
      }
    }

  _getScoreSummaryText () {
    const companyName = this._sanitizeAndFormatCompanyName();
    const formattedChallenges = this._formatChallenges();

    if (this.totalScore >= 8) {
      return `Your commerce ecosystem at ${companyName} is operating at a high level, with efficient processes, clear roadmaps and strong platform capabilities. You're ahead of the curve, but continued success depends on active refinement.<br><br>You noted areas such as ${formattedChallenges}, which suggest there are still efficiencies to unlock or opportunities to explore. Even the most mature platforms benefit from a fresh perspective and regular optimisation.<br><br>We work with high-performing businesses to fine-tune what's already working, so you can maintain your lead and stay agile in a fast-moving market.<br><br>Book a meeting with our experts to explore advanced optimisation and innovation opportunities, and keep your platform future-ready.`;
    } else if (this.totalScore >= 6) {
      return `Your commerce platform and operations at ${companyName} are stable, but they're not fully working in your favour. The fundamentals are sound, but there are clear opportunities for improvement that could significantly increase your efficiency and ability to scale.<br><br>You mentioned ongoing issues such as ${formattedChallenges}, which are likely adding friction and slowing your momentum. These may seem minor now but could be holding back your full potential.<br><br>We can help you shift from 'good enough' to genuinely optimised, unlocking smarter operations and sustainable growth.<br><br>Book a meeting with our experts to uncover where you're losing value, and turn that into measurable gains.`;
    } else if (this.totalScore >= 4) {
      return `Your commerce operations at ${companyName} show signs of strain, with areas of strength held back by persistent weak points. While not in crisis, your current state is quietly creating friction and preventing progress.<br><br>You identified challenges such as ${formattedChallenges}. These signal inefficiencies that if left unresolved will impact your ability to scale effectively.<br><br>Our team specialises in identifying hidden gaps and delays, fixing them before they become barriers. With focused support, we can help you strengthen weak areas and build the resilience your business needs to move forward confidently.<br><br>Book a meeting with our experts to address the cracks now, before they grow into roadblocks.`;
    } else {
      return `Your commerce platform and operations at ${companyName} are underperforming in key areas, and this is actively holding back your ability to grow and scale.<br><br>You highlighted serious concerns such as ${formattedChallenges}, which suggest that foundational issues are being overlooked or unresolved. These inefficiencies and capability gaps are creating instability, slowing performance, and leaving your business vulnerable to delays, rising costs, and missed opportunities.<br><br>The longer these issues remain unaddressed, the more damaging and expensive they will become. A lack of strategic clarity and operational focus today can result in compounding risks tomorrow.<br><br>Book a meeting with our experts today. This is your opportunity to regain control, stabilise your foundation, and reignite growth before further damage is done.`;
    }
  }

  _getScorePercentage () {
    return 5 + (this.totalScore / 10) * 90;
  }
}

customElements.define('roi-calculator-form', RoiCalculatorForm);
