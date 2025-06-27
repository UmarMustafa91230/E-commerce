import React from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
} from '@mui/material';
import {
  Security,
  DataUsage,
  Cookie,
  Visibility,
  Share,
  Delete,
  Update,
  ContactSupport,
} from '@mui/icons-material';

const PrivacyPolicy = () => {
  const lastUpdated = 'January 15, 2024';

  const sections = [
    {
      title: 'Information We Collect',
      icon: <DataUsage />,
      content: [
        {
          subtitle: 'Personal Information',
          text: 'We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support. This may include:',
          items: [
            'Name, email address, and phone number',
            'Billing and shipping addresses',
            'Payment information (processed securely through our payment partners)',
            'Account preferences and settings',
            'Communication history with our support team'
          ]
        },
        {
          subtitle: 'Automatically Collected Information',
          text: 'When you visit our website, we automatically collect certain information about your device and usage:',
          items: [
            'IP address and device identifiers',
            'Browser type and version',
            'Operating system',
            'Pages visited and time spent on each page',
            'Referring website or source',
            'Click patterns and navigation behavior'
          ]
        }
      ]
    },
    {
      title: 'How We Use Your Information',
      icon: <Visibility />,
      content: [
        {
          subtitle: 'Primary Uses',
          text: 'We use the information we collect to:',
          items: [
            'Process and fulfill your orders',
            'Provide customer support and respond to inquiries',
            'Send order confirmations and shipping updates',
            'Process payments and prevent fraud',
            'Improve our website and services',
            'Send marketing communications (with your consent)',
            'Comply with legal obligations'
          ]
        },
        {
          subtitle: 'Analytics and Improvement',
          text: 'We use aggregated, anonymous data to:',
          items: [
            'Analyze website performance and user behavior',
            'Improve our product offerings and user experience',
            'Develop new features and services',
            'Conduct market research and trend analysis'
          ]
        }
      ]
    },
    {
      title: 'Information Sharing and Disclosure',
      icon: <Share />,
      content: [
        {
          subtitle: 'Service Providers',
          text: 'We may share your information with trusted third-party service providers who assist us in:',
          items: [
            'Payment processing and fraud prevention',
            'Order fulfillment and shipping',
            'Customer support and communication',
            'Website hosting and maintenance',
            'Analytics and marketing services'
          ]
        },
        {
          subtitle: 'Legal Requirements',
          text: 'We may disclose your information when required by law or to:',
          items: [
            'Comply with legal processes or government requests',
            'Protect our rights, property, or safety',
            'Prevent fraud or security threats',
            'Enforce our terms of service or other agreements'
          ]
        }
      ]
    },
    {
      title: 'Data Security',
      icon: <Security />,
      content: [
        {
          subtitle: 'Security Measures',
          text: 'We implement comprehensive security measures to protect your information:',
          items: [
            'SSL encryption for all data transmission',
            'Secure payment processing through PCI-compliant partners',
            'Regular security audits and vulnerability assessments',
            'Access controls and employee training',
            'Data backup and disaster recovery procedures',
            'Monitoring for suspicious activity'
          ]
        },
        {
          subtitle: 'Data Retention',
          text: 'We retain your information for as long as necessary to:',
          items: [
            'Provide our services and maintain your account',
            'Comply with legal and regulatory requirements',
            'Resolve disputes and enforce agreements',
            'Improve our services and prevent fraud'
          ]
        }
      ]
    },
    {
      title: 'Your Rights and Choices',
      icon: <Update />,
      content: [
        {
          subtitle: 'Access and Control',
          text: 'You have the right to:',
          items: [
            'Access and review your personal information',
            'Update or correct inaccurate information',
            'Request deletion of your account and data',
            'Opt-out of marketing communications',
            'Control cookie preferences',
            'Export your data in a portable format'
          ]
        },
        {
          subtitle: 'Marketing Preferences',
          text: 'You can manage your marketing preferences by:',
          items: [
            'Updating your account settings',
            'Clicking unsubscribe links in emails',
            'Contacting our customer support team',
            'Adjusting browser cookie settings'
          ]
        }
      ]
    },
    {
      title: 'Cookies and Tracking',
      icon: <Cookie />,
      content: [
        {
          subtitle: 'Types of Cookies',
          text: 'We use different types of cookies for various purposes:',
          items: [
            'Essential cookies for website functionality',
            'Analytics cookies to understand usage patterns',
            'Marketing cookies for personalized advertising',
            'Preference cookies to remember your settings'
          ]
        },
        {
          subtitle: 'Cookie Management',
          text: 'You can control cookies through:',
          items: [
            'Browser settings and privacy controls',
            'Our cookie consent banner',
            'Third-party opt-out tools',
            'Contacting us for assistance'
          ]
        }
      ]
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h2" gutterBottom sx={{ color: '#1a1a1a', fontWeight: 700 }}>
          Privacy Policy
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
          How we collect, use, and protect your personal information
        </Typography>
        <Chip 
          label={`Last Updated: ${lastUpdated}`} 
          color="primary" 
          variant="outlined"
        />
      </Box>

      {/* Introduction */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom sx={{ color: '#1a1a1a', fontWeight: 600 }}>
            Introduction
          </Typography>
          <Typography variant="body1" paragraph>
            At Brands-R-khan, we are committed to protecting your privacy and ensuring the security of your personal information. 
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, 
            make purchases, or interact with our services.
          </Typography>
          <Typography variant="body1" paragraph>
            By using our website and services, you consent to the collection and use of your information as described in this policy. 
            We may update this policy from time to time, and we will notify you of any material changes.
          </Typography>
        </CardContent>
      </Card>

      {/* Main Sections */}
      {sections.map((section, index) => (
        <Card key={index} sx={{ mb: 4 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Box sx={{ color: 'primary.main', mr: 2 }}>
                {section.icon}
              </Box>
              <Typography variant="h5" sx={{ color: '#1a1a1a', fontWeight: 600 }}>
                {section.title}
              </Typography>
            </Box>
            
            {section.content.map((content, contentIndex) => (
              <Box key={contentIndex} sx={{ mb: contentIndex < section.content.length - 1 ? 4 : 0 }}>
                <Typography variant="h6" gutterBottom sx={{ color: '#1a1a1a', fontWeight: 600 }}>
                  {content.subtitle}
                </Typography>
                <Typography variant="body1" paragraph>
                  {content.text}
                </Typography>
                <List dense>
                  {content.items.map((item, itemIndex) => (
                    <ListItem key={itemIndex} sx={{ pl: 0 }}>
                      <ListItemIcon sx={{ minWidth: 24 }}>
                        <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: 'primary.main' }} />
                      </ListItemIcon>
                      <ListItemText primary={item} />
                    </ListItem>
                  ))}
                </List>
              </Box>
            ))}
          </CardContent>
        </Card>
      ))}

      {/* Contact Information */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <ContactSupport sx={{ color: 'primary.main', mr: 2 }} />
            <Typography variant="h5" sx={{ color: '#1a1a1a', fontWeight: 600 }}>
              Contact Us
            </Typography>
          </Box>
          <Typography variant="body1" paragraph>
            If you have any questions about this Privacy Policy or our data practices, please contact us:
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography variant="body2">
              <strong>Email:</strong> brandrkhanoffical@gmail.com
            </Typography>
            <Typography variant="body2">
              <strong>Phone:</strong> +1 (555) 123-4567
            </Typography>
            <Typography variant="body2">
              <strong>Address:</strong> 123 Luxury Avenue, Downtown, New York, NY 10001
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Data Deletion */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Delete sx={{ color: 'primary.main', mr: 2 }} />
            <Typography variant="h5" sx={{ color: '#1a1a1a', fontWeight: 600 }}>
              Data Deletion Requests
            </Typography>
          </Box>
          <Typography variant="body1" paragraph>
            You have the right to request deletion of your personal information. To submit a deletion request:
          </Typography>
          <List dense>
            <ListItem sx={{ pl: 0 }}>
              <ListItemIcon sx={{ minWidth: 24 }}>
                <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: 'primary.main' }} />
              </ListItemIcon>
              <ListItemText primary="Email us at brandrkhanoffical@gmail.com with the subject 'Data Deletion Request'" />
            </ListItem>
            <ListItem sx={{ pl: 0 }}>
              <ListItemIcon sx={{ minWidth: 24 }}>
                <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: 'primary.main' }} />
              </ListItemIcon>
              <ListItemText primary="Include your account email address and reason for deletion" />
            </ListItem>
            <ListItem sx={{ pl: 0 }}>
              <ListItemIcon sx={{ minWidth: 24 }}>
                <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: 'primary.main' }} />
              </ListItemIcon>
              <ListItemText primary="We will process your request within 30 days and confirm deletion" />
            </ListItem>
          </List>
        </CardContent>
      </Card>

      {/* Footer Note */}
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="body2" color="text.secondary">
          This Privacy Policy is effective as of {lastUpdated} and will remain in effect except with respect to any changes in its provisions in the future.
        </Typography>
      </Box>
    </Container>
  );
};

export default PrivacyPolicy; 