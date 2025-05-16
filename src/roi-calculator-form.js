import { LitElement, html, css } from 'lit';

export class RoiCalculatorForm extends LitElement {
  static properties = {
    // Form data
    platform: { type: String },
    operationalSatisfaction: { type: String },
    backlogEfficiency: { type: String },
    challenges: { type: Array },
    roadmapClarity: { type: String },
    name: { type: String },
    email: { type: String },
    jobTitle: { type: String },
    companyName: { type: String },
    // Form state
    formSubmitted: { type: Boolean },
    formErrors: { type: Object },
    // Scoring
    totalScore: { type: Number },
    showScore: { type: Boolean },
    meetingRequested: { type: Boolean },
    // CSRF token
    csrfToken: { type: String }
  };

  constructor() {
    super();
    // Initialize properties
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
    // Initialize scoring properties
    this.totalScore = 0;
    this.showScore = false;
    this.meetingRequested = false;
    // Initialize CSRF token - check localStorage first for persistence across page refreshes, otherwise generate a new one
    const storedToken = localStorage.getItem('csrfToken');
    if (storedToken) {
      this.csrfToken = storedToken;
    } else {
      this._generateCsrfToken();
    }
  }

  // Generate CSRF token client-side
  _generateCsrfToken() {
    try {
      // Generate a random token using a more secure method
      const array = new Uint8Array(16);
      window.crypto.getRandomValues(array);
      this.csrfToken = Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');

      // Store the token in localStorage for persistence across page refreshes
      localStorage.setItem('csrfToken', this.csrfToken);
    } catch (error) {
      console.error('Error generating CSRF token:', error);
    }
  }

  // Scoring methods
  // For platform, we just store the text value, no scoring needed
  _getPlatformValue() {
    return this.platform;
  }

  _getOperationalSatisfactionScore() {
    const scores = {
      'Very unhappy': 0.00,
      'Unhappy': 0.75,
      'Neutral': 1.5,
      'Happy': 2.25,
      'Very happy': 3.0
    };
    return scores[this.operationalSatisfaction] || 0;
  }

  _getBacklogEfficiencyScore() {
    const scores = {
      'Very unhappy': 0.00,
      'Unhappy': 0.75,
      'Neutral': 1.5,
      'Happy': 2.25,
      'Very happy': 3.0
    };
    return scores[this.backlogEfficiency] || 0;
  }

  _getChallengesScore() {
    // For challenges, the score is max 3 points, with 1 point deducted per challenge selected
    return Math.max(0, 3 - this.challenges.length);
  }

  _getRoadmapClarityScore() {
    const scores = {
      'Yes': 2.0,
      'Somewhat': 1.0,
      'No': 0.00
    };
    return scores[this.roadmapClarity] || 0;
  }

  _calculateTotalScore() {
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
      color: #333;
    }

    .form-header {
      text-align: center;
      margin-bottom: 30px;
    }

    .form-title {
      color: #333;
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 10px;
      margin-top: 0;
    }

    .form-subtitle {
      color: #666;
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
      color: #333;
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
      border-color: #e91e63;
      box-shadow: 0 0 0 2px rgba(233, 30, 99, 0.2);
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
      border-color: #e91e63;
      background-color: #fff;
    }

    .radio-option input[type="radio"]:checked::after {
      content: '';
      position: absolute;
      top: 3px;
      left: 3px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: #e91e63;
    }

    .checkbox-option input[type="checkbox"]:checked::after {
      content: '✓';
      position: absolute;
      top: -2px;
      left: 3px;
      font-size: 14px;
      color: #e91e63;
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
      color: #e91e63;
      font-weight: bold;
      margin-top: 20px;
      margin-bottom: 20px;
    }

    .score-container {
      background-color: #ffffff;
      border: 1px solid #e0e0e0;
      border-radius: 12px;
      padding: 30px;
      margin-top: 40px;
      margin-bottom: 40px;
      text-align: center;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
    }

    .score-title {
      font-size: 22px;
      margin-bottom: 20px;
      color: #333;
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
      background-color: #e91e63;
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
      color: #666;
      margin-bottom: 30px;
      line-height: 1.6;
      max-width: 80%;
      margin-left: auto;
      margin-right: auto;
    }

    /* No additional styles needed for request-meeting-button as they're inherited from the base button styles */

    .meeting-requested-message {
      color: #e91e63;
      font-weight: bold;
      margin-top: 15px;
      font-size: 16px;
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
      background-color: #333;
      border-radius: 4px;
      transform: translateX(-50%);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    }

  `;

  render() {
    return html`
      <div class="roi-calculator-form">
        <div class="form-header">
          <h2 class="form-title">ROI Calculator</h2>
          <p class="form-subtitle">Evaluate your eCommerce platform's performance and potential</p>
        </div>

        ${this.formSubmitted ? 
          html`
            ${this.showScore ? 
              html`
                <div class="score-container">
                  <div class="score-title">Your current health score</div>
                  <div class="score-value ${this._getScoreColorClass()}">${this.totalScore}/10</div>
                  <div class="score-description">
                    ${this.totalScore >= 7 ? 
                      'Your score indicates a low opportunity for ROI improvement!' : 
                      this.totalScore >= 4 ? 
                        'Your score indicates a moderate opportunity for ROI improvement.' : 
                        'Your score indicates a significant opportunity for ROI improvement.'}
                  </div>

                  <div class="score-slider-container">
                    <div class="score-marker" style="left: ${this._getScorePercentage()}%">
                    </div>
                  </div>

                  ${this.meetingRequested ? 
                    html`<div class="meeting-requested-message">Thank you! We'll contact you soon to schedule a meeting.</div>` : 
                    html`<button class="request-meeting-button" @click=${this._handleRequestMeeting}>Request Meeting</button>`
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

              <button type="submit">Submit</button>
            </form>
          `
        }
      </div>
    `;
  }

  // Event handlers
  _handlePlatformChange(e) {
    this.platform = e.target.value;
  }

  _handleOperationalSatisfactionChange(e) {
    this.operationalSatisfaction = e.target.value;
  }

  _handleBacklogEfficiencyChange(e) {
    this.backlogEfficiency = e.target.value;
  }

  _handleChallengesChange(e) {
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

  _handleRoadmapClarityChange(e) {
    this.roadmapClarity = e.target.value;
  }

  _handleNameChange(e) {
    this.name = e.target.value;
  }

  _handleEmailChange(e) {
    this.email = e.target.value;
  }

  _handleJobTitleChange(e) {
    this.jobTitle = e.target.value;
  }

  _handleCompanyNameChange(e) {
    this.companyName = e.target.value;
  }

  _handleSubmit(e) {
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

  async _handleRequestMeeting() {
    try {
      // Ensure we have a CSRF token before proceeding
      if (!this.csrfToken) {
        console.log('CSRF token not available, generating now...');
        this._generateCsrfToken();
      }

      // ===================================================================
      // IMPORTANT: HubSpot API Configuration
      // You must replace these placeholder values with your actual HubSpot values
      // ===================================================================
      const portalId = '12345678'; // Replace with your actual HubSpot portal ID
      const formGuid = 'abcdef12-3456-7890-abcd-ef1234567890'; // Replace with your actual form GUID
      const endpoint = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`;

      // Format data according to HubSpot's requirements
      // See: https://developers.hubspot.com/docs/reference/api/marketing/forms/v3-legacy#submit-data-to-a-form-unauthenticated
      const hubspotData = {
        fields: [
          { name: 'platform', value: this.platform },
          { name: 'operational_satisfaction', value: this.operationalSatisfaction },
          { name: 'backlog_efficiency', value: this.backlogEfficiency },
          { name: 'challenges', value: this.challenges.join(';') },
          { name: 'roadmap_clarity', value: this.roadmapClarity },
          { name: 'firstname', value: this.name.split(' ')[0] },
          { name: 'lastname', value: this.name.split(' ').slice(1).join(' ') },
          { name: 'email', value: this.email },
          { name: 'jobtitle', value: this.jobTitle },
          { name: 'company', value: this.companyName },
          { name: 'total_score', value: this.totalScore.toString() }
        ],
        context: {
          pageUri: window.location.href,
          pageName: document.title
        },
        legalConsentOptions: {
          consent: {
            consentToProcess: true,
            // Customize this text with your company name and privacy policy
            text: "I agree to allow the company to store and process my personal data in accordance with the Privacy Policy."
          }
        }
      };

      console.log('Sending data to HubSpot:', hubspotData);

      // Send data to HubSpot
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(hubspotData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        // throw new Error(`HubSpot API error: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`);
      }

      const responseData = await response.json();
      console.log('HubSpot response:', responseData);

      // Update the UI to show that the meeting has been requested
      this.meetingRequested = true;

      // Dispatch a custom event that can be listened to by the parent
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
      // Display error message to the user
      alert(`Failed to request meeting: ${error.message}`);
    }
  }

  _validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  // Get the appropriate color class based on the score
  _getScoreColorClass() {
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

  // Calculate the percentage position for the score marker on the slider
  _getScorePercentage() {
    // Convert score to percentage (0-10 to 0-100)
    // Higher scores should be on the green side (right)
    // Adjust the range to keep the marker away from the edges (5% to 95%)
    return 5 + (this.totalScore / 10) * 90;
  }
}

customElements.define('roi-calculator-form', RoiCalculatorForm);
